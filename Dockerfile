FROM node:18 as build

WORKDIR /app/

COPY [ "package.json", "package-lock.json", "tsconfig.json", "./" ]
RUN [ "npm", "ci", "--force" ]
RUN [ "npm", "audit", "fix", "--force" ]

COPY [ "./src", "./src" ]
RUN  [ "npm", "run", "db-generate" ]
RUN  [ "npm", "run", "compile" ]

RUN [ "cp", "-r", "./src/infrastructure/prisma/", "./build/infrastructure/prisma/" ] 
RUN [ "npm", "prune", "--omit=dev", "--omit-peer" ]
RUN [ "rm", "-rf", "./src", "./tsconfig.json" ]


FROM node:18 as prod
ENV NODE_ENV=production

USER node

WORKDIR /app/

COPY --from=build --chown=node:node [ "/app/", "/app/" ]
RUN [ "mv", "./build", "./src" ]

CMD [ "npm", "start" ]
