import express from "express";
import mongoose from "mongoose";
import passport = require("passport");
import { authRouter } from "./api/Auth";
import { pollRouter } from "./api/Poll/";
import { userRouter } from "./api/User";
import { voteRouter } from "./api/Vote";
import { BASE_PATH, MONGODB_URI } from "./config";
import { errorHandler, global } from "./middleware";
import { logger } from "./utils/logger";

class App {
    public express = express();
    private basePath = BASE_PATH || "";
    constructor() {
        this.boot();
    }

    private boot() {
        this.registerMiddlewares();
        this.mountRoutes();
        this.initilizeDb();
        this.handleUncaughtErrorEvents();

    }

    private mountRoutes() {
        this.express.use(`${this.basePath}/auth`, authRouter);
        // this.express.use(`${this.basePath}/users`, userRouter);
        this.express.use(passport.authenticate("jwt", { session: false }));
        this.express.use(`${this.basePath}/polls`, pollRouter);
        this.express.use(`${this.basePath}/votes`, voteRouter);
    }

    private registerMiddlewares() {
        global(this.express);
    }

    private initilizeDb() {
        // stop ensureIndex deprecation warning
        mongoose.set("useCreateIndex", true);

        // Connect to our Database and handle any bad connections
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
        }).then(() => {
            logger.info(`Database connection succesful: ${MONGODB_URI}`);
        }).catch((err) => {
            logger.error(`Something went wrong while connecting to the database→ ${err.message}`);
        });
    }

    // Error handlers
    private handleUncaughtErrorEvents() {
        process.on("unhandledRejection", (reason, promise) => {
            throw reason;
        });

        process.on("uncaughtException", (error) => {
            logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
            process.exit(1);
        });

        process.on("SIGINT", () => {
            logger.info(" Alright! Bye bye!");
            process.exit();
        });

        this.express.use(errorHandler);

    }
}

export default new App().express;
