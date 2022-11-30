import {
    CREATE_ADVERTISE,
    FETCH_VISIBLE_ADVERTORIALS,
    FETCH_VISIBLE_ADVERTORIALS_TARGET_VALUE,
    FETCH_VISIBLE_SPONSORED_LINKS,
    FETCH_VISIBLE_SPONSORED_LINKS_TARGET_VALUE,
    SYNC_ADVERTISE,
    UPDATE_ADVERTISE,
} from "./constants";
import {
    createAdvertise,
    fetchVisibleAdvertorials,
    fetchVisibleSponsoredLinks,
    syncAdvertise,
    updateAdvertise,
} from "./thunk";

export const advertiseSharedOperations = [
    {
        thunk: createAdvertise,
        updateKey: CREATE_ADVERTISE,
    },
    {
        thunk: updateAdvertise,
        updateKey: UPDATE_ADVERTISE,
    },
    {
        thunk: syncAdvertise,
        updateKey: SYNC_ADVERTISE,
    },
];

export const visibleAdsSharedOperations = [
    {
        thunk: fetchVisibleSponsoredLinks,
        updateKey: FETCH_VISIBLE_SPONSORED_LINKS,
        targetValue: FETCH_VISIBLE_SPONSORED_LINKS_TARGET_VALUE,
    },
    {
        thunk: fetchVisibleAdvertorials,
        updateKey: FETCH_VISIBLE_ADVERTORIALS,
        targetValue: FETCH_VISIBLE_ADVERTORIALS_TARGET_VALUE,
    },
];
