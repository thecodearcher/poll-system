import { logger } from "../utils/logger";
import { ENVIRONMENT } from "./../config/";

/**
 * Handles errors in application
 *
 * @param {*} err
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export default (err, req, res, next) => {
    if (!err.isOperational) {
        if (ENVIRONMENT !== "development") {
            logger.error(
                "An unexpected error occurred please restart the application!",
                "\nError: " + err.message + " Stack: " + err.stack,
            );
            process.exit(1);
        }
    }
    logger.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
        } - Stack: ${err.stack}`,
    );

    if (typeof err !== "string") {
        err.stack = err.stack || "";
    }
    const errorDetails = {
        status: false,
        message: err.message || err,
        statusCode: err.statusCode || 500,
        data: err.data,
        stack: err.stack,
    };
    if (ENVIRONMENT === "production") {
        delete (errorDetails.stack);
    }

    res.status(err.statusCode || 500);
    return res.json(errorDetails);
};
