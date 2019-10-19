import { IUserDocument } from './userModel';
import bcrypt from "bcrypt";
import mongoose, { Model } from "mongoose";
import { IUser } from "./IUser";
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export interface IUserDocument extends IUser {
    fullName(): string;
    isValidPassword(v: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
    findByUsername(v: string): mongoose.DocumentQuery<IUserDocument, IUserDocument>;
}

// This is called a pre-hook, before the user information is saved in the database
// this function will be called, we'll get the plain text password, hash it and store it.
UserSchema.pre<IUserDocument>("save", async function (next) {
    console.log(this.password);
    const hash = await bcrypt.hash(this.password, 10);
    // Replace the plain text password with the hash and then store it
    this.password = hash;
    next();
});

UserSchema.method('toJSON', () => {
    console.log("toJSON");
    let userObject = this.toObject();
    delete (userObject.password)
    return userObject;
})

class User extends mongoose.Model {
        // toJSON() {
        //     console.log("toJSON");
        //     let userObject = this.toObject();
        //     delete (userObject.password)
        //     return userObject;
        // }

        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        }

        public static findByUsername(username: string) {
            return UserModel.findOne({ username });
        }

        /**
         * Hashes the password sent by the user for login and checks if the hashed password stored in the
         * database matches the one sent. Returns true if it does else false.
         *
         * @memberof User
         */
        public async isValidPassword(password: string) {
            return await bcrypt.compare(password, this.password);
        }
    }

UserSchema.loadClass(User);
export const UserModel = mongoose.model<IUserDocument, IUserModel>("User", UserSchema);
