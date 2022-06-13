# Serverless Rest API with Typescript, Webpack and MongoDB

## Project structure

```
.
├── src
│   ├── modules
│   │   └── polls
│   │        ├── polls.serverless.yml
│   │        ├── PollsController.ts
│   │        ├── PollsDTOs.ts
│   │        ├── PollsHandler.ts
│   │        ├── PollsService.ts
│   │        └── PollsTypes.ts
│   ├── db
│   │   ├── Database.ts
│   │   └── DatabaseError.ts
│   │
│   └── utils
│       ├── config.ts
│       ├── messages.ts
│       ├── middlewares.ts
│       └── response.ts
│
├── package.json
├── serverless.yml                     
├── README.md
├── webpack.config.js
└── tsconfig.json     
```

## Deploy

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
