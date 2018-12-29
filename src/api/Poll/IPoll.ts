import { IBaseInterface } from "../baseInterface";

export interface IPoll extends IBaseInterface {
    title: string;
    topics: [{
        name: string,
        _id: string,
    }];
}
