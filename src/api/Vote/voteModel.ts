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
    findByCandidate(v: string): mongoose.DocumentQuery<IVoteDocument, IVoteDocument>;
}

class Vote extends mongoose.Model {

}

VoteSchema.loadClass(Vote);
export const VoteModel = mongoose.model<IVoteDocument, IVoteModel>("Vote", VoteSchema);
