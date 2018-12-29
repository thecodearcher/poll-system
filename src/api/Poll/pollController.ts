import { BaseController } from "../baseController";
import { IPoll } from "./IPoll";
import { PollService } from "./pollService";

export class PollController extends BaseController {
    private _pollService = new PollService();

    public getPoll = async (id) => {
        let user = await this._pollService.getPoll(id);
        return this.sendResponse(user);
    }

    public addPoll = async (poll: IPoll) => {
        let response = await this._pollService.createPoll(poll);
        return this.sendResponse(response);
    }
}
