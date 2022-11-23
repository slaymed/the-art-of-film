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
        <div {...rest} className={classNames("p-8 flex flex-col sm:p-16 bg-light-dark", { [className]: className })}>
            {!gift && !loading && (
                <TextHeader className="bg-light-dark text-3xl">
                    <span className="text-accent">Gift</span> not found
                </TextHeader>
            )}

            {gift && (
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

                    {(loading || syncing.loading) && <LoadingBox />}

                    {!loading && !syncing.loading && <GiftCard gift={gift} />}
                </div>
            )}
        </div>
    );
};

export default GiftScreen;
