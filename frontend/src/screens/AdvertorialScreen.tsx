import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import LoadingBox from "../components/kits/LoadingBox";
import MessageBox from "../components/kits/MessageBox";
import Page from "../components/pages/Page";
import { AdvertisementType } from "../store/advertisements/enums";
import AdvertorialPage from "../components/pages/advertise/AdvertorialPage";
import { useSelector } from "react-redux";
import { fetchingAdvertisements, selectAdvertiseById, syncingAdvertisement } from "../store/advertisements/selectors";
import { useParams } from "react-router-dom";

export interface AdvertorialScreenProps extends ComponentProps<"div"> {}

const AdvertorialScreen: FC<AdvertorialScreenProps> = ({ className = "", ...rest }) => {
    const { advertisementId } = useParams();

    const advertisement = useSelector(selectAdvertiseById(advertisementId));
    const fetching = useSelector(fetchingAdvertisements);
    const syncing = useSelector(syncingAdvertisement);

    if (fetching.loading || syncing.loading)
        return (
            <Page>
                <LoadingBox />
            </Page>
        );

    if (fetching.errors.message || syncing.errors.message)
        return (
            <Page>
                <MessageBox>{fetching.errors.message || syncing.errors.message}</MessageBox>
            </Page>
        );

    if (!advertisement)
        return (
            <Page>
                <MessageBox>Advertisement Not Found</MessageBox>
            </Page>
        );

    return (
        <Page {...rest} className={classNames("", { [className]: className })}>
            <div className="container mx-auto flex flex-col gap-8">
                {advertisement.type === AdvertisementType.ADVERTORIAL && (
                    <AdvertorialPage advertisement={advertisement} />
                )}
            </div>
        </Page>
    );
};

export default AdvertorialScreen;
