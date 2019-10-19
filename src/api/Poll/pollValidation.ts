import Joi from "joi";
const HexRegExp = RegExp(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i);
export const PollValidationSchema = Joi.object().keys({
    user: Joi.string().regex(HexRegExp).required(),
    title: Joi.string().min(3).max(30).required(),
    topics: Joi.array().items({name: Joi.string().required()}).min(1).required(),
});
