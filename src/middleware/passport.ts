import _ from "lodash";
import { ExtractJwt, Strategy as JWTstrategy } from "passport-jwt";
import { Strategy as localStrategy } from "passport-local";
import { UserModel } from "../api/User";
import { JWT_SECRET } from "./../config/index";
import { AppError } from "./../utils/app-error";

export const signupStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, username, password, done) => {
    try {
        const body = _.pick(req.body, ["firstName", "lastName"]);
        const exUser = await UserModel.findByUsername(username);

        if (exUser) {
            return done(new AppError(`An account with "${username}" already exist. Please login to continue`));
        }
        const user = await UserModel.create(
            {
                username,
                password,
                firstName: body.firstName,
                lastName: body.lastName,
            });

        // Send the user information to the next middleware
        return done(null, user);
    } catch (error) {
        done(Error(error));
    }
});

export const loginStrategy = new localStrategy({
    usernameField: "username",
    passwordField: "password",
}, async (username, password, done) => {
    try {
        const user = await UserModel.findByUsername(username);
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, { message: "Wrong Password" });
        }
        // Send the user information to the next middleware
        return done(null, user, { message: "Logged in Successfully" });
    } catch (error) {
        return done(error);
    }
});

export const jwtStrategy = new JWTstrategy({
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}, async (token, done) => {
    try {
        // Pass the user details to the next middleware
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
});
