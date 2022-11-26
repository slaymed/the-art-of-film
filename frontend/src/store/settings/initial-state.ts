import { LazyOperationInitialState } from "../initial-state";
import { ISettingState } from "./types";

export const SettingsInitialState: ISettingState = {
    fetchingWebsiteSettings: LazyOperationInitialState,
    websiteSettings: null,
};
