import { SchemaMap } from "joi";
import { Document } from "mongoose";

export interface IBaseInterface extends SchemaMap, Document {
    createdAt?: Date;
    modifiedAt?: Date;
}
