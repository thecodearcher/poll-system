import express from "express";
import { validation } from "../../middleware";
import { controllerHandler } from "./../shared/controllerHandler";
import { VoteController } from "./voteController";
import { VoteValidationSchema } from "./voteValidation";

const router = express.Router();
const call = controllerHandler;
const Vote = new VoteController();

router.use(validation(VoteValidationSchema));

/**
 * @api {get} /votes/:id Request Vote information
 * @apiName GetVotes
 * @apiGroup Vote
 *
 * @apiParam {String} id Vote unique ID.
 */
router.get("/:id", call(Vote.getVoteDetails, (req, res, next) => [req.params.id]));

/**
 * @api {get} /votes/poll/:id Get Poll votes
 * @apiName GetByPoll
 * @apiGroup Vote
 *
 * @apiParam {String} id Poll unique ID.
 */
router.get("/poll/:id", call(Vote.getPollVotes, (req, res, next) => [req.params.id]));

/**
 * @api {get} /votes/topic/:id Get Topic Votes
 * @apiName GetTopicVotes
 * @apiGroup Vote
 *
 * @apiParam {String} id topic unique ID.
 */
router.get("/topic/:id", call(Vote.getTopicVotes, (req, res, next) => [req.params.id]));

/**
 * @api {post} /votes/ Add Vote
 * @apiName AddVote
 * @apiGroup Vote
 *
 * @apiParam {JSON} VoteModel Json data of Vote model .
 *
 *
 * @apiSampleRequest off
 */
router.post("/", call(Vote.addVote, (req, res, next) => [req.body]));

export const voteRouter = router;
