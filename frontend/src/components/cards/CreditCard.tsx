import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import Button from "../elements/Button";
import Paragraph from "../elements/Paragraph";
import TextHeader from "../elements/TextHeader";

import { useDispatch } from "../../hooks/useDispatch";

import { ICreditCard } from "../../store/payment-methods/types";
import { defaultACreditCard } from "../../store/payment-methods/thunks";
import { defaultingCreditCard } from "../../store/payment-methods/selectors";
import LoadingBox from "../kits/LoadingBox";
import { Link, useParams } from "react-router-dom";

export interface CreditCardProps extends ComponentProps<"div"> {
    creditCard: ICreditCard;
}

const CreditCard: FC<CreditCardProps> = ({ className = "", creditCard, ...rest }) => {
    const { creditCardId } = useParams();

    const dispatch = useDispatch();

    const defaulting = useSelector(defaultingCreditCard);

    const defaultACard = () => {
        dispatch(defaultACreditCard(creditCard.id));
    };

    return (
        <div
            {...rest}
            className={classNames(
                "relative overflow-hidden flex-shrink-0 bg-dark-card w-[410px] h-[260px] flex flex-col group justify-between py-6 px-8 items-center",
                { [className]: className }
            )}
        >
            <div className="flex justify-end items-center w-full">
                {creditCard.default && (
                    <div className="bg-accent/60 py-0.5 px-2 rounded">
                        <Paragraph className="text-xs text-white">Default</Paragraph>
                    </div>
                )}
            </div>
            <div className="flex-flex-col justify-between space-y-4 w-full">
                <div className="flex flex-col w-full">
                    <div className="flex space-x-3 items-center tracking-widest select-none text-slate-500">
                        <Paragraph className="text-4xl pt-3">****</Paragraph>
                        <Paragraph className="text-4xl pt-3">****</Paragraph>
                        <Paragraph className="text-4xl pt-3">****</Paragraph>
                        <Paragraph className="text-3xl tracking-widest line-clamp-1">{creditCard.last4}</Paragraph>
                    </div>
                    <div className="flex space-x-8 justify-between items-center">
                        <div className="flex space-x-2 items-center">
                            <Paragraph className="text-slate-500">CVC</Paragraph>
                            <Paragraph className="py-0.5 px-2 rounded bg-slate-500 text-xs">{creditCard.cvc}</Paragraph>
                        </div>
                        <Paragraph className="text-slate-500">{`${creditCard.exp_month}/${creditCard.exp_year}`}</Paragraph>
                    </div>
                </div>
                <div className="flex items-center justify-between space-x-8">
                    <Paragraph className="text-2xl font-bold uppercase tracking-wider text-white/60 line-clamp-1">
                        {creditCard.billing_details.name}
                    </Paragraph>
                    <TextHeader className="text-2xl italic font-bold select-none !tracking-widest text-accent/90">
                        {creditCard.brand}
                    </TextHeader>
                </div>
            </div>
            {(creditCardId !== creditCard.id || !creditCard.default) && (
                <div
                    className={classNames(
                        "absolute flex-col space-y-2 w-full h-full left-0 -top-full duration-200 group-hover:top-0 bg-black/20 flex justify-center items-center"
                    )}
                >
                    {!creditCard.default && (
                        <Button className="py-2 px-4 bg-accent text-black rounded" type="button" onClick={defaultACard}>
                            {defaulting.loading ? (
                                <LoadingBox />
                            ) : (
                                <Paragraph className="text-sm">Make it your default card</Paragraph>
                            )}
                        </Button>
                    )}

                    {creditCardId !== creditCard.id && (
                        <Link to={`/payment-methods/credit-cards/${creditCard.id}`}>
                            <Paragraph className="underline select-none text-accent underline-offset-2 text-sm">
                                Visit
                            </Paragraph>
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default memo(CreditCard);
