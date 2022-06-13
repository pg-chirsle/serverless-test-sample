import Joi from "joi";

export const CreatePollDTO = Joi.object({
  name: Joi.string().required()
})

export const GetPollDTO = Joi.object({
  id: Joi.string().required()
})