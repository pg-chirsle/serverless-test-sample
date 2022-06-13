import { JsonRequired, ValidBody } from "@src/utils/middlewares";
import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import PollController from "./PollsController";
import { CreatePollDTO } from "./PollsDTOs";

class PollHandler {

  @JsonRequired
  @ValidBody(CreatePollDTO)
  static async createPoll(event: APIGatewayEvent, context: Context, body: any): Promise<APIGatewayProxyResult> {
    return PollController.createPoll(event, context, body);
  }

  static async getPolls(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    return await PollController.getPolls(event, context);
  }

  static async getPoll(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> {
    return PollController.getPoll(event, context);
  }

  @JsonRequired
  @ValidBody(CreatePollDTO)
  static async updatePoll(event: APIGatewayEvent, context: Context, body: any) {
    return PollController.updatePoll(event, context, body);
  }

  static async deletePoll(event: APIGatewayEvent, context: Context) {
    return PollController.deletePoll(event, context);
  }
}

export const createPoll =  PollHandler.createPoll;
export const getPolls = PollHandler.getPolls;
export const getPoll = PollHandler.getPoll;
export const updatePoll = PollHandler.updatePoll;
export const deletePoll = PollHandler.deletePoll;