import express from "express";
import passport = require("passport");
import { loginStrategy, signupStrategy, validation } from "../../middleware";
import { controllerHandler } from "./../shared/controllerHandler";
import { AuthController } from "./authController";
import { LoginValidationSchema, SignupValidationSchema } from "./authValidation";

const router = express.Router();
const call = controllerHandler;
const Auth = new AuthController();

passport.use("signup", signupStrategy);
passport.use("login", loginStrategy);
/**
 * @api {post} /auth/signup Signup
 * @apiName Signup
 * @apiGroup Auth
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": example
 *       "password": password
 *       "firstName": name
 *       "lastName": test
 *     }
 */
router.post("/signup", [validation(SignupValidationSchema), passport.authenticate("signup", { session: false })],
    call(Auth.signup, (req, res, next) => [req.user]));

/**
 * @api {post} /auth/signin Signin
 * @apiName Signin
 * @apiGroup Auth
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": example
 *       "password": password
 *     }
 */
router.post("/signin", [validation(LoginValidationSchema)],
    call(Auth.login, (req, res, next) => [req, res, next]));

export const authRouter = router;
