import { IBaseInterface } from "../baseInterface";

export interface IVote extends IBaseInterface {
    poll;
    topicId;
    voter;
}
