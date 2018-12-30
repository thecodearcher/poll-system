import passport = require("passport");
import { UserModel } from "./../api/User/userModel";
import { AppError } from "./../utils/app-error";

/**
 * middleware for checking authorization with jwt
 */
export default (req, res, next) => {
    passport.authenticate("jwt", { session: false }, async (error, token) => {
        if (error || !token) {
            next(new AppError("Unauthorized", null, 401));
        }
        try {
            const user = await UserModel.findById(token._id);
            req.user = user;
        } catch (error) {
            next(error);
        }
        next();
    })(req, res, next);
};
