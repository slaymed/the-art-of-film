import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Page from "../components/pages/Page";
import TextHeader from "../components/elements/TextHeader";
import { Link, useParams } from "react-router-dom";
import { fetchingAdvertisements, selectAdvertiseById, syncingAdvertisement } from "../store/advertisements/selectors";
import { useSelector } from "react-redux";
import LoadingBox from "../components/kits/LoadingBox";
import MessageBox from "../components/kits/MessageBox";
import Paragraph from "../components/elements/Paragraph";
import { AdvertisementType } from "../store/advertisements/enums";
import AdvertorialPage from "../components/pages/advertise/AdvertorialPage";
import SponsoredLinkPage from "../components/pages/advertise/SponsoredLinkPage";
import AdvertisementBannerPage from "../components/pages/advertise/AdvertisementBannerPage";

export interface AdvertisementScreenProps extends ComponentProps<"div"> {}

const AdvertisementScreen: FC<AdvertisementScreenProps> = ({ className = "", ...rest }) => {
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
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <TextHeader className="text-3xl text-accent">{advertisement.title}</TextHeader>
                    <Link to={`/edit-advertisement/${advertisement._id}`}>
                        <Paragraph className="text-accent text-sm underline underline-offset-2">Edit</Paragraph>
                    </Link>
                </div>

                {advertisement.type === AdvertisementType.ADVERTORIAL && (
                    <AdvertorialPage advertisement={advertisement} showTitle={false} />
                )}
                {advertisement.type === AdvertisementType.SPONSOR && (
                    <SponsoredLinkPage advertisement={advertisement} showTitle={false} />
                )}
                {advertisement.type === AdvertisementType.BANNER && (
                    <AdvertisementBannerPage advertisement={advertisement} showTitle={false} />
                )}

                <Link to={`/advertisement-transaction/${advertisement._id}`}>
                    <Paragraph className="text-accent underline underline-offset-2 font-bold text-sm tracking-widest">
                        Advertisement Transaction
                    </Paragraph>
                </Link>
            </div>
        </Page>
    );
};

export default AdvertisementScreen;
