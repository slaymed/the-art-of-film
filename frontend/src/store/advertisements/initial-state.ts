import { LazyOperationInitialState, OperationInitialState } from "../initial-state";
import {
    CREATE_ADVERTISE,
    FETCH_VISIBLE_ADVERTORIALS,
    FETCH_VISIBLE_ADVERTORIALS_TARGET_VALUE,
    FETCH_VISIBLE_SPONSORED_LINKS,
    FETCH_VISIBLE_SPONSORED_LINKS_TARGET_VALUE,
    SYNC_ADVERTISE,
    UPDATE_ADVERTISE,
} from "./constants";
import { IAdvertisementState } from "./types";

export const AdvertisementInitialState: IAdvertisementState = {
    fetching: LazyOperationInitialState,
    [CREATE_ADVERTISE]: OperationInitialState,
    [UPDATE_ADVERTISE]: OperationInitialState,
    [SYNC_ADVERTISE]: OperationInitialState,
    [FETCH_VISIBLE_ADVERTORIALS]: OperationInitialState,
    [FETCH_VISIBLE_SPONSORED_LINKS]: OperationInitialState,
    [FETCH_VISIBLE_ADVERTORIALS_TARGET_VALUE]: [],
    [FETCH_VISIBLE_SPONSORED_LINKS_TARGET_VALUE]: [],
    fetchingHomeScreenBanner: OperationInitialState,
    homeScreenBanner: null,
    list: [],
    adsLastFetch: null,
    adsCacheDuration: 1000 * 60 * 3,
    cashed: [],
};
