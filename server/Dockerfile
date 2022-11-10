# Server
FROM registry.access.redhat.com/ubi9/nodejs-16:1 AS server
# Static env vars
ARG VERSION
ENV VERSION $VERSION
ENV NODE_ENV production
ENV HOME_SERVER /opt/app-root/src/app/server

# Configure server
# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_SERVER}

WORKDIR ${HOME_SERVER}
ADD .yarn/releases/yarn-3.2.4.cjs ./.yarn/releases/yarn-3.2.4.cjs
RUN npm install yarn -g && yarn set version ./.yarn/releases/yarn-3.2.4.cjs
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable
COPY . .
RUN yarn run build
# Run app

RUN chown -R 1001 ${HOME_SERVER}

USER 1001
EXPOSE 8080
CMD [ "yarn", "run", "start:prod" ]