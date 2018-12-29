import { BaseController } from "../baseController";
import { IVote } from "./IVote";
import { VoteService } from "./voteService";

export class VoteController extends BaseController {
    private _VoteService = new VoteService();

    public getVoteDetails = async (id) => {
        let user = await this._VoteService.getVote(id);
        return this.sendResponse(user);
    }

    public addVote = async (Vote: IVote) => {
        let response = await this._VoteService.createVote(Vote);
        return this.sendResponse(response);
    }
}
