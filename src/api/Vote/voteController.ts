import _ from "lodash";
import { BaseController } from "../baseController";
import { IVote } from "./IVote";
import { VoteService } from "./voteService";

export class VoteController extends BaseController {
    private _VoteService = new VoteService();

    public getVoteDetails = async (id) => {
        let vote = await this._VoteService.getVote(id);
        return this.sendResponse(vote);
    }
    public getPollVotes = async (id) => {
        let poll = await this._VoteService.getVotesByPoll(id);
        return this.sendResponse(poll);
    }
    public getTopicVotes = async (id) => {
        let topic = await this._VoteService.getVotesByTopic(id);
        return this.sendResponse(topic);
    }

    public addVote = async (Vote: IVote) => {
        let response = await this._VoteService.createVote(Vote);
        return this.sendResponse(response);
    }
}
