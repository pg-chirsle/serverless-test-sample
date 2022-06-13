import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

class Database {
  static client: DocumentClient = new AWS.DynamoDB.DocumentClient();
}

export default Database;