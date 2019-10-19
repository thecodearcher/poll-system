import mongoose from "mongoose";
import { AppError } from "./../../utils/app-error";
import { PollModel } from "./../Poll/pollModel";
import { IVote } from "./IVote";
import { VoteModel } from "./voteModel";

export class VoteService {
    public getVote(_id: string) {
        return VoteModel.find({ _id })
            .populate("poll", "_id title");
    }

    public async createVote(_vote: IVote) {
        let poll = await PollModel.findByTopic(_vote.topicId);
        if (!poll) {
            throw new AppError(`${_vote.topicId} does not match any record`);
        } else if (poll.id !== _vote.poll) {
            throw new AppError(`${_vote.poll} does not have topic: ${_vote.topicId}.`);
        }

        let vote = await new VoteModel(_vote).save();
        poll.update({ $push: { votes: vote.id } })
            .exec();
        return vote;
    }

    public async getVotesByPoll(pollId: string) {
        let aggregate = await VoteModel.findPollAggregate();
        // tslint:disable-next-line:triple-equals
        return aggregate.find((val) => val.poll == pollId);
    }

    public getVotesByTopic(topicId: string) {
        return VoteModel.findByTopic(topicId)
            .populate("poll", "_id title");
    }

}
