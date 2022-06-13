import { QueryError } from "@src/db/DatabaseError";
import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import Joi, { Description } from "joi";
import { joiOptions } from "./config";
import { ErrorMesssage } from "./messages";
import APIResponse, { StatusCode } from "./response";


export const CatchError = (target: any, propertyName: any, descriptor: any) => {
  const original = descriptor.value;
  const wrapper = async (...args: any) => {
    try {
      return await original(...args);
    } catch (error) {
      if (error instanceof QueryError) return APIResponse.badRequest(error.message);
      return APIResponse.badRequest(ErrorMesssage.INTERNAL_SERVER_ERROR, StatusCode.INTERNAL_SERVER_ERROR);
    }
  }
  descriptor.value = wrapper
}


export const JsonRequired = (target: any, functionName: string, descriptor: Description) => {
  const original = descriptor.value;
  const wrapper = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    try {
      if (!event.body) throw new Error(ErrorMesssage.INVALID_REQUEST);
      const body = JSON.parse(event.body);
      return original({...event, body}, context);

    } catch (error) {
      return APIResponse.badRequest(ErrorMesssage.INVALID_REQUEST)
    }
  }
  descriptor.value = wrapper
}


export const ValidBody = (schema: Joi.Schema) => {
  return (target: any, functionName: string, descriptor: Description) => {
    const original = descriptor.value;  
    const wrapper = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
      const { error, value } = schema.validate(event.body, joiOptions);
      if (error) {
        const body = `${error.details.map(field => field.message).join(', ')}`
        return APIResponse.badRequest(body);
      }
      return original(event, context, value);
    }
    descriptor.value = wrapper
  }
}