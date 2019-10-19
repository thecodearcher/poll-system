import mongoose, { Document, Model, Schema } from "mongoose";
import { IVote } from "./IVote";

const VoteSchema = new mongoose.Schema({
    poll: { type: Schema.Types.ObjectId, ref: "Poll" },
    topicId: {
        type: Schema.Types.ObjectId,
    },
    voter: { type: Schema.Types.ObjectId, ref: "Users" },

}, { timestamps: true });

export interface IVoteDocument extends IVote, Document {

}

export interface IVoteModel extends Model<IVoteDocument> {
    findPollAggregate(): mongoose.Aggregate<any[]>;
    findByTopic(v: string): mongoose.DocumentQuery<IVoteDocument, IVoteDocument>;
}

class Vote extends mongoose.Model {
    public static findPollAggregate() {
        return this.aggregate([
            { $group: { _id: "$poll", votes: { $push: "$topicId" } } },
            { $project: { poll: "$_id", _id: 0, votes: 1 } },
        ])
            .exec();
    }

    public static findByTopic(topicId: string) {
        return this.find({ topicId: mongoose.Types.ObjectId(topicId) });
    }
}

VoteSchema.loadClass(Vote);
export const VoteModel = mongoose.model<IVoteDocument, IVoteModel>("Vote", VoteSchema);
