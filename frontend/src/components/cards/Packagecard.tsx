import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import Paragraph from "../elements/Paragraph";
import { ISubscription } from "../../store/subscription/types";
import { user } from "../../store/auth/selectors";
import { useSelector } from "react-redux";
import CurrencyConvert from "../kits/CurrencyConvert";

export interface PackagecardProps extends ComponentProps<"div"> {
    sub: ISubscription;
    annual: boolean;
}

const Packagecard: FC<PackagecardProps> = ({ className = "", sub, annual, ...rest }) => {
    const userInfo = useSelector(user);

    const { name, yearPrice, monthPrice, perks, itsPopular } = sub;

    return (
        <div
            {...rest}
            className={classNames("flex flex-col w-[340px] h-[480px] border-2 border-accent rounded overflow-hidden", {
                "border-none": itsPopular,
                [className]: className,
            })}
        >
            <div
                className={classNames("text-3xl flex space-x-2 items-center justify-center bg-accent p-4 w-full", {
                    "bg-gradient-to-t from-indigo-400 to-teal-500 border-t-2 border-x-2 border-teal-500": itsPopular,
                })}
            >
                <Paragraph className="text-black w-fit uppercase tracking-widest font-bold">{name}</Paragraph>
                {itsPopular && (
                    <Paragraph className="text-xs uppercase bg-white/20 font-bold tracking-wider text-white py-1 px-3 rounded">
                        Popular
                    </Paragraph>
                )}
            </div>

            <div
                className={classNames("flex pt-8 flex-col space-y-8 p-8 items-center flex-1 justify-between", {
                    "border-b-2 border-x-2 border-indigo-400": itsPopular,
                })}
            >
                <Paragraph
                    className={classNames("text-2xl text-accent uppercase tracking-wider font-bold", {
                        "text-indigo-400": itsPopular,
                    })}
                >
                    {annual ? (
                        <>
                            <CurrencyConvert amount={yearPrice} /> {"/Year"}
                        </>
                    ) : (
                        <>
                            <CurrencyConvert amount={monthPrice} /> {"/Month"}
                        </>
                    )}
                </Paragraph>

                <div className="flex flex-col space-y-4 items-center">
                    {perks.map((perk, index) => (
                        <Paragraph key={index} className="text-sm text-center text-slate-300">
                            {perk}
                        </Paragraph>
                    ))}
                </div>

                {(annual || !userInfo || !userInfo.trialUsed) && (
                    <div className="flex flex-col space-y-2 justify-center items-center">
                        {(!userInfo || !userInfo.trialUsed) && (
                            <Paragraph
                                className={classNames(
                                    "text-xs text-center bg-accent/20 py-1 px-3 rounded text-accent",
                                    {
                                        "bg-indigo-400/20 text-indigo-400": itsPopular,
                                    }
                                )}
                            >
                                Include Free Trial
                            </Paragraph>
                        )}

                        {annual && (
                            <Paragraph
                                className={classNames(
                                    "text-xs text-center capitalize bg-accent/20 py-1 px-3 rounded text-accent",
                                    {
                                        "bg-indigo-400/20 text-indigo-400": itsPopular,
                                    }
                                )}
                            >
                                Include 2 months free
                            </Paragraph>
                        )}
                    </div>
                )}

                {userInfo ? (
                    <Link to={`/subscribe/${sub._id}`}>
                        <Paragraph
                            className={classNames(
                                "text-sm text-accent underline underline-offset-2 font-bold tracking-wider",
                                { "text-indigo-400": itsPopular }
                            )}
                        >
                            Get Started
                        </Paragraph>
                    </Link>
                ) : (
                    <Link to="/register">
                        <Paragraph
                            className={classNames(
                                "text-sm text-accent underline underline-offset-2 font-bold tracking-wider",
                                { "text-indigo-400": itsPopular }
                            )}
                        >
                            Register
                        </Paragraph>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Packagecard;
