import Joi from "joi";

export const VoteValidationSchema = Joi.object().keys({
    poll: Joi.string().required(),
    topicId: Joi.string().required(),
    voter: Joi.string(),
});
