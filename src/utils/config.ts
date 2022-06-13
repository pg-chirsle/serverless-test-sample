import Joi from "joi";

export const joiOptions: Joi.AsyncValidationOptions = {
  abortEarly: false,
  allowUnknown: true,
  stripUnknown: true,
}

export default {
  APP_PORT: process.env.APP_PORT,
  DB_HOST_NAME: process.env.DB_HOST_NAME,
  ENDPOINT_DB: process.env.ENDPOINT_DB,
  REGION: process.env.REGION,
  IS_OFFLINE: process.env.IS_OFFLINE,
}