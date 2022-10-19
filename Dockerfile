# Client
FROM registry.access.redhat.com/ubi9/nodejs-16 AS client

# Build client
ENV HOME_CLIENT /opt/app-root/src/app/client
# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_CLIENT} && chown -R 1001 ${HOME_CLIENT}
WORKDIR ${HOME_CLIENT}
ADD client/.yarn/releases/yarn-3.2.4.cjs ./.yarn/releases/yarn-3.2.4.cjs
RUN npm install yarn -g && yarn set version ./.yarn/releases/yarn-3.2.4.cjs
COPY client/package.json client/yarn.lock client/.yarnrc.yml ./
RUN yarn install --immutable
RUN chown -R 1001 .
USER 1001
COPY client/. .
RUN INLINE_RUNTIME_CHUNK=false yarn run build

# Server
FROM registry.access.redhat.com/ubi9/nodejs-16:1 AS server
# Static env vars
ARG VERSION
ENV VERSION $VERSION
ENV NODE_ENV production
ENV HOME_SERVER /opt/app-root/src/app/server
ENV HOME_CLIENT /opt/app-root/src/app/client

# Configure server
# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_SERVER}
RUN mkdir -p ${HOME_CLIENT}
RUN chown -R 1001 ${HOME_CLIENT}
RUN chown -R 1001 ${HOME_SERVER}
COPY --from=client /opt/app-root/src/app/client/build /opt/app-root/src/app/client/build/.

WORKDIR ${HOME_SERVER}
ADD server/.yarn/releases/yarn-3.2.4.cjs ./.yarn/releases/yarn-3.2.4.cjs
RUN npm install yarn -g && yarn set version ./.yarn/releases/yarn-3.2.4.cjs
COPY server/package.json server/yarn.lock server/.yarnrc.yml ./
RUN yarn install --immutable
RUN chown -R 1001 .
USER 1001
COPY server/. .
RUN yarn run build
# Run app
EXPOSE 8080
CMD [ "yarn", "run", "start:prod" ]
