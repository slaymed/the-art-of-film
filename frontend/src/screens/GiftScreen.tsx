import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { fetchingGifts, selectGiftById, syncingGifts } from "../store/gifts/selectors";
import { syncGift } from "../store/gifts/thunks";

import RefetchButton from "../components/kits/RefetchButton";
import Paragraph from "../components/elements/Paragraph";
import TextHeader from "../components/elements/TextHeader";
import GiftCard from "../components/cards/GiftCard";
import LoadingBox from "../components/kits/LoadingBox";

import { useDispatch } from "../hooks/useDispatch";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";

export interface GiftScreenProps extends ComponentProps<"div"> {}

const GiftScreen: FC<GiftScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const { giftId } = useParams();

    const gift = useSelector(selectGiftById(giftId));
    const { loading } = useSelector(fetchingGifts);
    const syncing = useSelector(syncingGifts);

    const refetch = () => {
        if (!gift) return;

        dispatch(syncGift(gift._id));
    };

    return (
        <div
            {...rest}
            className={classNames("p-8 flex flex-col sm:p-16 gap-8 bg-light-dark", { [className]: className })}
        >
            {!gift && !loading && (
                <TextHeader className="bg-light-dark text-3xl">
                    <span className="text-accent">Gift</span> not found
                </TextHeader>
            )}

            {(loading || syncing.loading) && <LoadingBox />}

            {!loading && !syncing.loading && gift && (
                <div className="flex flex-col gap-8">
                    <div className="flex flex-wrap justify-between items-center">
                        <Paragraph className="bg-light-dark text-accent uppercase font-bold tracking-widest text-6xl">
                            Gift
                        </Paragraph>
                        <div className="flex flex-wrap items-center gap-4">
                            <RefetchButton onClick={refetch} />
                            <Link to="/redeem-gift-sub">
                                <Paragraph className="text-sm underline underline-offset-2 text-accent">
                                    Redeem
                                </Paragraph>
                            </Link>
                        </div>
                    </div>

                    <GiftCard gift={gift} />
                </div>
            )}

            {!loading && !syncing.loading && (
                <Link to="/purchaced-gifts">
                    <Paragraph className="text-accent text-sm tracking-wider underline underline-offset-2">
                        See All Purchaced Gifts
                    </Paragraph>
                </Link>
            )}
        </div>
    );
};

export default GiftScreen;
