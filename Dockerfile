FROM node:16-alpine AS base

RUN mkdir /srv/app && chown node:node /srv/app
USER node
WORKDIR /srv/app

EXPOSE 3000
EXPOSE 9229

FROM base as dev
ENV NODE_ENV=development
COPY --chown=node:node package.json yarn.lock ./
RUN yarn
CMD ["yarn", "dev"]

# FROM base as prod
# COPY . .
# COPY --chown=node:node package.json yarn.lock ./
# RUN yarn
# ENV NODE_ENV=production
# RUN yarn build:prod
# CMD ["yarn", "start:prod"]
