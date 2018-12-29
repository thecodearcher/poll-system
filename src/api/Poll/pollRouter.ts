import express from "express";
import { validation } from "../../middleware";
import { controllerHandler } from "./../shared/controllerHandler";
import { PollController } from "./pollController";
import { PollValidationSchema } from "./pollValidation";

const router = express.Router();
const call = controllerHandler;
const Poll = new PollController();

router.use(validation(PollValidationSchema));

/**
 * @api {get} /polls/:id Request Poll information
 * @apiName GetPolls
 * @apiGroup Poll
 *
 * @apiParam {String} id Poll unique ID.
 *
 *
 */
router.get("/:id", call(Poll.getPoll, (req, res, next) => [req.params.id]));

/**
 * @api {post} /polls/ Add Poll
 * @apiName AddPoll
 * @apiGroup Poll
 *
 * @apiParam {JSON} PollModel Json data of Poll model .
 *
 *
 * @apiSampleRequest off
 */
router.post("/", call(Poll.addPoll, (req, res, next) => [req.body]));

export const pollRouter = router;
