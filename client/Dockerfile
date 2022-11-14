FROM registry.access.redhat.com/ubi9/nodejs-16:1
# Static env vars
ARG VERSION
ENV VERSION $VERSION
ENV NODE_ENV production
ENV HOME_CLIENT /opt/app-root/src/app/client

# Using root to transfer ownership of work dir
USER root
RUN mkdir -p ${HOME_CLIENT}

WORKDIR ${HOME_CLIENT}
ADD .yarn/releases/yarn-3.2.4.cjs ./.yarn/releases/yarn-3.2.4.cjs
RUN npm install yarn -g && yarn set version ./.yarn/releases/yarn-3.2.4.cjs
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable
COPY . .
RUN INLINE_RUNTIME_CHUNK=false yarn run build

RUN chown -R 1001 ${HOME_CLIENT}

USER 1001
EXPOSE 3000
CMD [ "yarn", "run", "start" ]