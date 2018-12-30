import Joi from "joi";
import { IUser } from "./IUser";

export const UserValidationSchema = Joi.object().keys(<IUser> {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().alphanum().min(4).max(30).required(),
});
