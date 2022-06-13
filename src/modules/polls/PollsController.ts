import { QueryError } from "@src/db/DatabaseError";
import { ErrorMesssage, SuccessMessage } from "@src/utils/messages";
import { CatchError } from "@src/utils/middlewares";
import APIResponse from "@src/utils/response";
import { APIGatewayEvent, Context } from "aws-lambda";
import PollService from "./PollsService";
import { ICreatePoll } from "./PollsTypes";

class PollController {
  @CatchError
  static async createPoll(event: APIGatewayEvent, context: Context, body: ICreatePoll) {
    const poll = await PollService.createPoll(body.name);
    return APIResponse.success({ poll });
  }

  @CatchError
  static async getPolls(event: APIGatewayEvent, context: Context) {
    const { items } = await PollService.getAllPolls()
    console.log(items);
    return APIResponse.success({ polls: items });
  }

  @CatchError
  static async getPoll(event: APIGatewayEvent, context: Context) {
    const id = event.pathParameters?.id as string;

    const poll = await PollService.getPollDetail(id);
    if (!poll) throw new QueryError(ErrorMesssage.NOT_FOUND);

    return APIResponse.success({ poll });
  }

  @CatchError
  static async updatePoll(event: APIGatewayEvent, context: Context, body: ICreatePoll) {
    const id = event.pathParameters?.id as string;
    const { name } = body;
    const result = await PollService.updatePoll(id, name)
    return APIResponse.success({ poll: result });
  }

  @CatchError
  static async deletePoll(event: APIGatewayEvent, context: Context) {
    const id = event.pathParameters?.id as string;
    await PollService.deletePoll(id);
    return APIResponse.success({ message: SuccessMessage.SUCCESS });
  }
}

export default PollController;