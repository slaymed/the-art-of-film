import { GlobalOperation, TimeStamp } from "../types";

export interface ITag extends TimeStamp {
    _id: string;
    name: string;
}

export type AllTags = {
    casts: ITag[];
    directors: ITag[];
    artistes: ITag[];
};

export interface ITagsState extends AllTags {
    fetching: GlobalOperation;
}
