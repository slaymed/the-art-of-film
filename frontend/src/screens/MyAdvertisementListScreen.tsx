import React, { FC, ComponentProps, useMemo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import MessageBox from "../components/kits/MessageBox";
import Page from "../components/pages/Page";
import RefetchButton from "../components/kits/RefetchButton";
import LoadingBox from "../components/kits/LoadingBox";
import AdvertisementCard from "../components/cards/AdvertisementCard";
import H1 from "../components/elements/H1";

import { fetchAdvertisement } from "../store/advertisements/thunk";
import { user } from "../store/auth/selectors";
import { advertisementsSelector, fetchingAdvertisements } from "../store/advertisements/selectors";

export interface MyAdvertisementListScreenProps extends ComponentProps<"div"> {}

const MyAdvertisementListScreen: FC<MyAdvertisementListScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const userInfo = useSelector(user);
    const advertisements = useSelector(advertisementsSelector);
    const fetching = useSelector(fetchingAdvertisements);

    const list = useMemo(() => {
        if (!userInfo) return advertisements;
        return advertisements.filter((ad) => ad.user && ad.user === userInfo._id);
    }, [advertisements, userInfo]);

    const refetch = () => dispatch(fetchAdvertisement());

    return (
        <Page {...rest} className={classNames("", { [className]: className })}>
            <div className="flex items-center flex-wrap gap-8 justify-between">
                <H1 className="text-2xl sm:text-4xl text-accent">My Advertisements</H1>
                <RefetchButton onClick={refetch} />
            </div>

            {fetching.loading && <LoadingBox />}

            {list.length === 0 && !fetching.loading && <MessageBox>No Advertisement</MessageBox>}

            {list.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {list.map((ad) => (
                        <AdvertisementCard key={ad._id} advertisement={ad} />
                    ))}
                </div>
            )}
        </Page>
    );
};

export default MyAdvertisementListScreen;
