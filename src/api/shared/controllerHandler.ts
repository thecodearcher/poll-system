/**
 * Handles controller execution and responds to user (API Express version).
 * @param promise Controller Promise. I.e. ControllerInstance().getUser.
 * @param params A function (req, res, next), all of which are optional
 * that maps our desired controller parameters. I.e. (req) => [req.params.username, ...].
 */
// tslint:disable-next-line:ban-types
export const controllerHandler = (promise: Function, params) => {
    return async (req, res, next) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            // tslint:disable-next-line:triple-equals
            console.log(req.body, req.user);
            if (req.body.user && req.body.user != req.user._id) {
                return next("This user is not authorized to make this request ");
            }
            const result = await promise(...boundParams, req, res);
            return res.json({
                status: true,
                data: result.data,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    };
};
