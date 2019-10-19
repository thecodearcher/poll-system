import mongoose, { Model, Schema } from "mongoose";
import { IPoll } from "./IPoll";

const PollSchema = new mongoose.Schema({
    title: String,
    user: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
    topics: [{
        name: {
            type: String,
            required: true,
            trim: true,
        },
    }],
    votes: [{
        type: Schema.Types.ObjectId,
        ref: "Vote",
    }],
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

// tslint:disable-next-line:no-empty-interface
export interface IPollDocument extends IPoll {

}

export interface IPollModel extends Model<IPollDocument> {
    findByTopic(v: string): mongoose.DocumentQuery<IPollDocument, IPollDocument>;
}

class Poll extends mongoose.Model {
    public static findByTopic(topicId) {
        return this.findOne({ "topics._id": topicId });
    }

    // public getTopics() {
    //     return this.topics;
    // }
}

PollSchema.loadClass(Poll);
export const PollModel = mongoose.model<IPollDocument, IPollModel>("Poll", PollSchema);
