import React, { FC, ComponentProps, useMemo, memo } from "react";
import classNames from "classnames";
import Paragraph from "../components/elements/Paragraph";
import RefetchButton from "../components/kits/RefetchButton";
import { useSelector } from "react-redux";
import { fetchingGifts, giftsList } from "../store/gifts/selectors";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import { useDispatch } from "../hooks/useDispatch";
import { fetchMyGifts } from "../store/gifts/thunks";
import GiftCard from "../components/cards/GiftCard";
import { Link, useSearchParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { GiftType } from "../store/gifts/enums";

export interface PurchacedGiftsScreenProps extends ComponentProps<"div"> {}

enum Filters {
    ALL = "all",
    SUBSCRIPTION = "subscription",
    USED = "used",
    NOT_USED = "unused",
}

const PurchacedGiftsScreen: FC<PurchacedGiftsScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const [usp, setUsp] = useSearchParams();
    const filter = (usp.get("filter") || Filters.ALL) as Filters;

    const fetching = useSelector(fetchingGifts);
    const gifts = useSelector(giftsList);

    const filteredList = useMemo(() => {
        if (!filter || filter === Filters.ALL) return gifts;

        switch (filter) {
            case Filters.USED:
                return gifts.filter((gift) => gift.used_at);
            case Filters.NOT_USED:
                return gifts.filter((gift) => !gift.used_at);
            case Filters.SUBSCRIPTION:
                return gifts.filter((gift) => gift.type === GiftType.SUBSCRIPTION);
            default:
                return gifts;
        }
    }, [filter, gifts]);

    const refetch = () => dispatch(fetchMyGifts());

    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 flex flex-col gap-8 bg-light-dark", { [className]: className })}
        >
            <div className="flex justify-between gap-4 items-center">
                <Paragraph className="text-xl sm:text-3xl font-bold tracking-widest text-accent">
                    Purchaced Gifts
                </Paragraph>
                <div className="flex flex-wrap items-center gap-4">
                    <RefetchButton onClick={refetch} />
                    <Link to="/redeem-gift-sub">
                        <Paragraph className="text-sm underline underline-offset-2 text-accent">Redeem</Paragraph>
                    </Link>
                </div>
            </div>

            <Tab.Group>
                <Tab.List className="flex w-full gap-4 text-xs flex-wrap">
                    <Tab
                        className={classNames(
                            "py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                            {
                                "bg-accent/30 text-accent": filter === Filters.ALL,
                            }
                        )}
                        onClick={() => setUsp({ filter: Filters.ALL })}
                    >
                        <Paragraph>All Purchaced Gifts</Paragraph>
                    </Tab>
                    <Tab
                        className={classNames(
                            "py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                            {
                                "bg-accent/30 text-accent": filter === Filters.USED,
                            }
                        )}
                        onClick={() => setUsp({ filter: Filters.USED })}
                    >
                        <Paragraph>Used Gifts</Paragraph>
                    </Tab>
                    <Tab
                        className={classNames(
                            "py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                            {
                                "bg-accent/30 text-accent": filter === Filters.NOT_USED,
                            }
                        )}
                        onClick={() => setUsp({ filter: Filters.NOT_USED })}
                    >
                        <Paragraph>Unused Gifts</Paragraph>
                    </Tab>
                    <Tab
                        className={classNames(
                            "py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                            {
                                "bg-accent/30 text-accent": filter === Filters.SUBSCRIPTION,
                            }
                        )}
                        onClick={() => setUsp({ filter: Filters.SUBSCRIPTION })}
                    >
                        <Paragraph>Subscription Gifts</Paragraph>
                    </Tab>
                </Tab.List>
            </Tab.Group>

            {fetching.loading && <LoadingBox />}
            <ErrorWithRedirect {...fetching} />

            {!fetching.loading && filteredList.length > 0 && (
                <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
                    {filteredList.map((gift) => (
                        <GiftCard gift={gift} key={gift._id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(PurchacedGiftsScreen);
