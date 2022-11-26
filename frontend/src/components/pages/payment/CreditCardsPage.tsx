import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { creditCardsSelector, fetchingCreditCards } from "../../../store/payment-methods/selectors";

import Paragraph from "../../elements/Paragraph";
import CreditCard from "../../cards/CreditCard";
import LoadingBox from "../../kits/LoadingBox";
import MessageBox from "../../kits/MessageBox";

export interface CreditCardsPageProps extends ComponentProps<"div"> {}

const CreditCardsPage: FC<CreditCardsPageProps> = ({ className = "", ...rest }) => {
    const creditCards = useSelector(creditCardsSelector);
    const fetching = useSelector(fetchingCreditCards);

    return (
        <div {...rest} className={classNames("flex flex-col space-y-8", { [className]: className })}>
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between items-center">
                <Paragraph className="text-2xl sm:text-3xl text-center sm:text-start uppercase text-accent font-bold tracking-widest">
                    Your Credit Cards
                </Paragraph>

                <Link to="/payment-methods/credit-cards/add">
                    <Paragraph className="text-sm text-accent underline underline-offset-2 font-bold tracking-wider">
                        New credit card
                    </Paragraph>
                </Link>
            </div>

            {fetching.loading ? (
                <LoadingBox className="mx-auto sm:ml-0" />
            ) : (
                <div className="w-full pb-2 overflow-x-auto scroll-bar">
                    {creditCards.length > 0 ? (
                        <div className="flex space-x-4 items-center">
                            {creditCards.map((creditCard) => (
                                <CreditCard key={creditCard.id} creditCard={creditCard} />
                            ))}
                        </div>
                    ) : (
                        <MessageBox className="text-center sm:text-start">No credit card added yet</MessageBox>
                    )}
                </div>
            )}

            {creditCards.length > 0 && (
                <Paragraph className="text-sm text-accent/80 text-center sm:text-start">
                    Subscriptions will charge your default payment method
                </Paragraph>
            )}
        </div>
    );
};

export default CreditCardsPage;
