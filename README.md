# Serverless Rest API with Typescript, Webpack and DynamoDB

## Project structure

```
.
├── src
│   ├── modules
│   │   └── polls
│   │        ├── polls.serverless.yml     # lambda routing
│   │        ├── PollsController.ts       # poll controller
│   │        ├── PollsDTOs.ts             # joi object for validating
│   │        ├── PollsHandler.ts          # lambda handler function
│   │        ├── PollsService.ts          # poll services (create, read, update, delete)
│   │        └── PollsTypes.ts            # all poll's interfaces
│   ├── db
│   │   ├── Database.ts                   # handle database connect
│   │   └── DatabaseError.ts              # define query error
│   │
│   └── utils
│       ├── config.ts                     # contain all config
│       ├── messages.ts                   # constant messages
│       ├── middlewares.ts                # decorator functions
│       └── response.ts                   # handle server response
│
├── package.json
├── serverless.yml                     
├── README.md
├── webpack.config.js
└── tsconfig.json     
```

## Deploy

Install all dependencies.
```
npm install
```

Deploy on AWS
```
npm run deploy
```

## Endpoints

```
POST - https://ucnyqr234h.execute-api.us-east-1.amazonaws.com/dev/polls
GET - https://ucnyqr234h.execute-api.us-east-1.amazonaws.com/dev/polls
GET - https://ucnyqr234h.execute-api.us-east-1.amazonaws.com/dev/polls/{id}
PUT - https://ucnyqr234h.execute-api.us-east-1.amazonaws.com/dev/polls/{id}
DELETE - https://ucnyqr234h.execute-api.us-east-1.amazonaws.com/dev/polls/{id}
```

## CI/CD

**Environments**

Have two enviroments are `dev` and `prod`
![ci/cd enviroments](https://github.com/pg-chirsle/serverless-test-sample/blob/main/statics/environments.png)

**Parameters**
![ci/cd image](https://github.com/pg-chirsle/serverless-test-sample/blob/main/statics/parameters.png)

**Auto deploy result**
![ci/cd image](https://github.com/pg-chirsle/serverless-test-sample/blob/main/statics/cicdresult.png)