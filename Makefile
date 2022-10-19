#!make

####################################################################
## Define default environment variables for local development
####################################################################

-include .env

export $(shell sed 's/=.*//' .env)

export GIT_LOCAL_BRANCH?=$(shell git rev-parse --abbrev-ref HEAD)
export DEPLOY_DATE?=$(shell date '+%Y%m%d%H%M')
export COMMIT_SHA?=$(shell git rev-parse --short=7 HEAD)
export IMAGE_TAG=${COMMIT_SHA}

export PROJECT := $(or $(PROJECT),pbgp)
export DB_USER := $(or $(DB_USER),db2inst1)
export DB_PASSWORD := $(or $(DB_PASSWORD),development)
export DB_NAME := $(or $(DB_NAME),testdb)
export DB_SERVER := $(or $(DB_SERVER),database)
export DB_PORT := $(or $(DB_PORT),5432)
export GIT_LOCAL_BRANCH := $(or $(GIT_LOCAL_BRANCH),dev)

export APP_NAME:=pbgp
export OS_NAMESPACE_PREFIX:=ed9154
export OS_NAMESPACE_SUFFIX?=dev
export TARGET_NAMESPACE=$(OS_NAMESPACE_PREFIX)-$(OS_NAMESPACE_SUFFIX)
export TOOLS_NAMESPACE=$(OS_NAMESPACE_PREFIX)-tools

define deployTag
"${PROJECT}-${DEPLOY_DATE}"
endef

####################################################################
## Status Output
####################################################################

print-status:
	@echo " +---------------------------------------------------------+ "
	@echo " | Current Settings                                        | "
	@echo " +---------------------------------------------------------+ "
	@echo " | GIT LOCAL BRANCH: $(GIT_LOCAL_BRANCH) "
	@echo " | PROJECT: $(PROJECT) "
	@echo " | DB_NAME: $(DB_NAME) "
	@echo " | DB_SERVER: $(DB_SERVER) "
	@echo " | DB_USER: $(DB_USER) "
	@echo " +---------------------------------------------------------+ "

####################################################################
## Local Development
####################################################################

run-local:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up -d

run-local-client:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up client

run-local-server:
	@echo "+\n++ Make: Running locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up server

run-local-db:
	@echo "+\n++ Make: Running db locally ...\n+"
	@docker-compose -f docker-compose.dev.yml up database

close-local:
	@echo "+\n++ Make: Closing local container ...\n+"
	@docker-compose -f docker-compose.dev.yml down

local-client-workspace:
	@docker exec -it $(PROJECT)-client sh

local-server-workspace:
	@docker exec -it $(PROJECT)-server bash

local-db-workspace:
	@docker exec -it $(PROJECT)-database bash

migrate-database-up:
	@docker exec -i $(PROJECT)-server npm run migrations-up
	
migrate-database-down:
	@docker exec -i $(PROJECT)-server npm run migrations-down

local-server-logs:
	@docker logs $(PROJECT)-server --tail 25 --follow

local-client-logs:
	@docker logs $(PROJECT)-client --tail 25 --follow

curl-client:
	@docker exec -i $(PROJECT)-server curl localhost:3000

add-role:
	@oc policy add-role-to-user admin system:serviceaccount:$(TARGET_NAMESPACE):default -n $(TOOLS_NAMESPACE)

networking-prep:
	@oc process -f openshift/networking.yml | oc apply -n $(TARGET_NAMESPACE) -f -

db-prep:
	@oc process -f openshift/patroni.prep.yml -p APP_NAME=$(APP_NAME) | oc create -n $(TARGET_NAMESPACE) -f -
	@oc policy add-role-to-user system:image-puller system:serviceaccount:$(TARGET_NAMESPACE):$(APP_NAME)-patroni -n $(TOOLS_NAMESPACE)

db-create:
	@oc process -f openshift/patroni.bc.yml -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -
	@oc process -f openshift/patroni.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) | oc apply -n $(TARGET_NAMESPACE) -f -

db-postgres-tunnel:
	@oc project $(TARGET_NAMESPACE)
	@oc port-forward $(APP_NAME)-patroni-0 5432

server-prep:
	@oc process -f openshift/ches.prep.yml -p APP_NAME=$(APP_NAME) | oc create -n $(TARGET_NAMESPACE) -f -
	@oc process -f openshift/keycloak.prep.yml -p APP_NAME=$(APP_NAME) | oc create -n $(TARGET_NAMESPACE) -f -

server-create:
	@oc process -f openshift/server.bc.yml -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -
	@oc process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) | oc apply -n $(TARGET_NAMESPACE) -f -

server-config-test:
	@oc -n $(TARGET_NAMESPACE)  process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA)  | oc apply -n $(TARGET_NAMESPACE) -f - --dry-run=client

server-config:
	@oc -n $(TARGET_NAMESPACE) process -f openshift/server.dc.yml -p APP_NAME=$(APP_NAME) IMAGE_NAMESPACE=$(TOOLS_NAMESPACE) IMAGE_TAG=$(OS_NAMESPACE_SUFFIX) CONFIG_VERSION=$(COMMIT_SHA) | oc apply -n $(TARGET_NAMESPACE) -f -

server-build-config-test:
	@echo "Testing Building config in $(TOOLS_NAMESPACE) namespace"
	@oc -n $(TOOLS_NAMESPACE) process -f openshift/server.bc.yml -p REF=$(BUILD_REF) -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f - --dry-run=client

build-config: server-build-config-test
	@echo "Processiong and applying Building config in $(TOOLS_NAMESPACE) namespace"
	@oc -n $(TOOLS_NAMESPACE) process -f openshift/server.bc.yml -p REF=$(BUILD_REF) -p APP_NAME=$(APP_NAME) | oc apply -n $(TOOLS_NAMESPACE) -f -

server-build: build-config
	@echo "Building server image in $(TOOLS_NAMESPACE) namespace"
	@oc cancel-build bc/$(APP_NAME)-server -n $(TOOLS_NAMESPACE)
	@oc start-build $(APP_NAME)-server -n $(TOOLS_NAMESPACE) --wait --follow=true --build-arg VERSION="$(LAST_COMMIT)"
	@oc tag $(APP_NAME)-server:latest $(APP_NAME)-server:$(COMMIT_SHA)

server-deploy:
	@oc tag $(APP_NAME)-server:$(COMMIT_SHA) $(APP_NAME)-server:$(OS_NAMESPACE_SUFFIX)