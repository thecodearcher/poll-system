import Joi from "joi";

export const LoginValidationSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
});

export const SignupValidationSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required().trim(),
    username: Joi.string().alphanum().required(),
    password: Joi.string().required(),
});
