import { IBaseInterface } from "../baseInterface";

export interface IPoll extends IBaseInterface {
    title: string;
    user: string;
    topics: [{
        name: string,
        _id: string,
    }];
}
