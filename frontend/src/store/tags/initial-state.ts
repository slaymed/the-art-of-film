import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import { ITagsState } from "./types";

export const TagsInitialState: ITagsState = {
    artistes: [],
    casts: [],
    directors: [],
    fetching: LazyOperationInitialState,
};
