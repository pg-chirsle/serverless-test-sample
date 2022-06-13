import Database from "@src/db/Database";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 } from "uuid";

class PollService {
  static tablename = "polls";
  static dbClient = Database.client;

  static async getAllPolls() {
    const params: DocumentClient.ScanInput = {
      TableName: this.tablename
    }
    const result = await this.dbClient.scan(params).promise()

    return { items: result.Items }
  }

  static async createPoll(name: string) {
    const poll = { id: v4(), name }
    await this.dbClient.put({
      TableName: this.tablename,
      Item: poll
    }).promise();

    return poll;
  }

  static async getPollDetail(id: string) {
    const poll = await this.dbClient.get({
      TableName: this.tablename,
      Key: { id }
    }).promise();

    return poll.Item;
  }

  static async updatePoll(id: string, name: string) {
    const result = await this.dbClient.update({
      TableName: this.tablename,
      Key: { id },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {":name": name },
      ReturnValues: "UPDATED_NEW",
    }).promise();

    return result.Attributes;
  }

  static async deletePoll(id: string) {
    const result = await this.dbClient.delete({
      TableName: this.tablename,
      Key: { id }
    }).promise();

    return result;
  }
}

export default PollService;