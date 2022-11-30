import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { advertisementsSelector, fetchingAdvertisements } from "../store/advertisements/selectors";
import { fetchAdvertisement } from "../store/advertisements/thunk";

import { useDispatch } from "../hooks/useDispatch";

import H1 from "../components/elements/H1";
import MessageBox from "../components/kits/MessageBox";
import Page from "../components/pages/Page";
import RefetchButton from "../components/kits/RefetchButton";
import Paragraph from "../components/elements/Paragraph";
import LoadingBox from "../components/kits/LoadingBox";
import AdvertisementCard from "../components/cards/AdvertisementCard";

export interface AdvertiseListScreenProps extends ComponentProps<"div"> {}

const AdvertiseListScreen: FC<AdvertiseListScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const advertisements = useSelector(advertisementsSelector);
    const fetching = useSelector(fetchingAdvertisements);

    const refetch = () => dispatch(fetchAdvertisement());

    return (
        <Page {...rest} className={classNames("", { [className]: className })}>
            <div className="flex items-center flex-wrap gap-8 justify-between">
                <H1 className="text-2xl sm:text-4xl">
                    <span className="text-accent">Advertisement</span> List
                </H1>
                <div className="flex gap-4 items-center flex-wrap">
                    <RefetchButton onClick={refetch} />
                    <Link to="/find-your-advertisement">
                        <Paragraph className="text-accent text-sm underline underline-offset-2">
                            Find Your Advertisement
                        </Paragraph>
                    </Link>
                </div>
            </div>

            {fetching.loading && <LoadingBox />}

            {advertisements.length === 0 && !fetching.loading && <MessageBox>No Advertisement</MessageBox>}

            {advertisements.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
                    {advertisements.map((ad) => (
                        <AdvertisementCard key={ad._id} advertisement={ad} />
                    ))}
                </div>
            )}
        </Page>
    );
};

export default AdvertiseListScreen;
