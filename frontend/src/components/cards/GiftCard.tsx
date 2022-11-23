import React, { FC, ComponentProps, useState, memo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { IGift } from "../../store/gifts/types";

import Paragraph from "../elements/Paragraph";
import Button from "../elements/Button";
import { useSelector } from "react-redux";
import { selectSubScriptionById } from "../../store/subscription/selectors";
import { GOLD, PLATINUM, SILVER } from "../../store/subscription/constants";

export interface GiftCardProps extends ComponentProps<"div"> {
    gift: IGift;
}

const GiftCard: FC<GiftCardProps> = ({ className = "", gift, ...rest }) => {
    const sub = useSelector(selectSubScriptionById(gift.targeted_ref_id));

    const [opened, setOpened] = useState(gift.used_at ? true : false);

    if (!gift.code || !gift.is_paid || !sub) return null;

    return (
        <div
            {...rest}
            className={classNames("bg-dark-card p-8 relative flex flex-col gap-8 w-full lg:w-96", {
                [className]: className,
            })}
        >
            <Link to={`/subscribe/${sub._id}`}>
                <Paragraph
                    className={classNames(
                        "text-3xl capitalize text-center underline underline-offset-4 font-bold tracking-widest",
                        {
                            "text-slate-400": sub.name === SILVER,
                            "text-cyan-500": sub.name === PLATINUM,
                            "text-accent": sub.name === GOLD,
                        }
                    )}
                >
                    {sub.name}
                </Paragraph>
            </Link>

            <Paragraph className="text-xl break-all tracking-widest mx-auto text-indigo-500 bg-indigo-500/20 text-center font-bold rounded w-fit py-1.5 px-4">
                {gift.code}
            </Paragraph>

            <div className="flex items-center flex-wrap gap-4 justify-center">
                <Paragraph
                    className={classNames("text-sm capitalize underline underline-offset-2 font-bold tracking-widest", {
                        "text-slate-400": sub.name === SILVER,
                        "text-cyan-500": sub.name === PLATINUM,
                        "text-accent": sub.name === GOLD,
                    })}
                >
                    {gift.type}
                </Paragraph>
                <Paragraph
                    className={classNames("text-sm font-bold underline underline-offset-2 tracking-widest", {
                        "text-slate-400": sub.name === SILVER,
                        "text-cyan-500": sub.name === PLATINUM,
                        "text-accent": sub.name === GOLD,
                    })}
                >
                    Paid
                </Paragraph>
                <Paragraph
                    className={classNames("text-sm capitalize underline underline-offset-2 font-bold tracking-widest", {
                        "text-slate-400": sub.name === SILVER,
                        "text-cyan-500": sub.name === PLATINUM,
                        "text-accent": sub.name === GOLD,
                    })}
                >
                    {gift.used_at ? "Already used" : "Not used yet"}
                </Paragraph>
            </div>

            {!opened && (
                <Button
                    className="absolute inset-0 flex items-center justify-center bg-dark-card backdrop-blur-2xl"
                    onClick={() => setOpened(true)}
                >
                    <span>
                        <i
                            className={classNames("shadow-lg animate-pulse text-7xl fa-solid fa-gift", {
                                "text-slate-400": sub.name === SILVER,
                                "text-cyan-500": sub.name === PLATINUM,
                                "text-accent": sub.name === GOLD,
                            })}
                        />
                    </span>
                </Button>
            )}
        </div>
    );
};

export default memo(GiftCard);
