import Joi from "joi";
import { IVote } from "./IVote";

export const VoteValidationSchema = Joi.object().keys(<IVote> {
    poll: Joi.string().required(),
    topicId: Joi.string().required(),
    voter: Joi.string(),
});
