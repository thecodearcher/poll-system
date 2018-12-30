import jwt from "jsonwebtoken";
import passport = require("passport");
import { BaseController } from "../baseController";
import { JWT_SECRET } from "./../../config";
import { AppError } from "./../../utils/app-error";
import { IUser } from "./../User/IUser";

export class AuthController extends BaseController {

    public login = async (req, res, next) => {
        return new Promise((resolve, reject) => {
            return passport.authenticate("login", (err, user, info) => {
                if (!user || err) {
                    reject(new AppError(info.message));
                }
                return req.login(user, { session: false }, (error) => {
                    if (error) {
                        reject(new AppError(error));
                    }
                    let token = this.generateToken(user);
                    resolve(this.sendResponse({ token }));
                });
            })(req, res, next);
        });
    }

    public signup = async (user: IUser) => {
        let token = this.generateToken(user);
        return this.sendResponse({ user, token }, "User registration succesful");
    }

    /**
     * generates JWT from user details
     *
     * @private
     * @param {IUser} user authenticated user
     * @returns {string} signed JWT
     * @memberof AuthController
     */
    private generateToken(user: IUser): string {
        const body = { _id: user._id, username: user.username };
        return jwt.sign({ user: body }, JWT_SECRET, { expiresIn: "24h" });
    }
}
