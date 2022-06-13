import Database from "@src/db/Database";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { v4 } from "uuid";
import { IPoll } from "./PollsTypes";

class PollService {
  static tablename = "polls";
  static dbClient = Database.client;

  static async getAllPolls(): Promise<IPoll[]> {
    const params: DocumentClient.ScanInput = {
      TableName: this.tablename
    }
    const result = await this.dbClient.scan(params).promise()

    return result.Items as IPoll[];
  }

  static async createPoll(newPoll: Omit<IPoll, "id">): Promise<IPoll> {
    const poll = { id: v4(), ...newPoll }
    await this.dbClient.put({
      TableName: this.tablename,
      Item: poll
    }).promise();

    return poll;
  }

  static async getPollDetail(id: string): Promise<IPoll> {
    const poll = await this.dbClient.get({
      TableName: this.tablename,
      Key: { id }
    }).promise();

    return poll.Item as IPoll;
  }

  static async updatePoll(poll: IPoll): Promise<string> {
    const result = await this.dbClient.update({
      TableName: this.tablename,
      Key: { id: poll.id },
      UpdateExpression: "set #name = :name",
      ExpressionAttributeNames: { "#name": "name" },
      ExpressionAttributeValues: {":name": poll.name },
      ReturnValues: "UPDATED_NEW",
    }).promise();

    return poll.id;
  }

  static async deletePoll(id: string): Promise<string> {
    const result = await this.dbClient.delete({
      TableName: this.tablename,
      Key: { id }
    }).promise();

    return id;
  }
}

export default PollService;