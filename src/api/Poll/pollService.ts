import { IPoll } from "./IPoll";
import { PollModel } from "./pollModel";

export class PollService {
    public getPoll(_id: string) {
        return PollModel.find({ _id })
        .populate("votes", "topicId");
    }

    public createPoll(Poll: IPoll) {
        return new PollModel(Poll).save();
    }
}
