import Joi from "joi";

export const PollValidationSchema = Joi.object().keys({
    title: Joi.string().min(3).max(30).required(),
    topics: Joi.array().items({name: Joi.string().required()}).min(1).required(),
});
