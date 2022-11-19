import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import Paragraph from "../components/elements/Paragraph";
import { useSelector } from "react-redux";
import { deletingCreditCard, fetchingCreditCards, selectCreditCardById } from "../store/payment-methods/selectors";
import TextHeader from "../components/elements/TextHeader";
import LoadingBox from "../components/kits/LoadingBox";
import { useNavigate, useParams } from "react-router-dom";
import CreditCard from "../components/cards/CreditCard";
import Button from "../components/elements/Button";
import { useDispatch } from "../hooks/useDispatch";
import { deleteCreditCard } from "../store/payment-methods/thunks";
import MessageBox from "../components/kits/MessageBox";
import { ThunkResponseType } from "../store/types";
import { CreditCardErrors, ICreditCard } from "../store/payment-methods/types";
import { RequestLifeCycle } from "../store/enums";
import OrderInfoPieceCard from "../components/cards/OrderInfoPieceCard";
import OrderInfoSeperator from "../components/kits/OrderInfoSeperator";

export interface CreditCardScreenProps extends ComponentProps<"div"> {}

const CreditCardScreen: FC<CreditCardScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { creditCardId } = useParams();

    const { loading } = useSelector(fetchingCreditCards);
    const deleting = useSelector(deletingCreditCard);
    const creditCard = useSelector(selectCreditCardById(creditCardId));

    const deleteCard = async () => {
        if (!creditCard) return;
        const res = await dispatch(deleteCreditCard(creditCard.id));
        const { status } = res.payload as ThunkResponseType<ICreditCard[], CreditCardErrors>;
        if (status !== RequestLifeCycle.SUCCESS) return;

        navigate("/payment-methods/credit-cards");
    };

    if (loading)
        return (
            <div className="p-8 smp-16 flex justify-center items-center">
                <LoadingBox />
            </div>
        );

    if (!creditCard)
        return (
            <TextHeader className="text-6xl p-8 smp-16 text-center">
                Credit Card <span className="text-accent">Not Found</span>
            </TextHeader>
        );

    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 bg-light-dark flex flex-col space-y-8", { [className]: className })}
        >
            <div className="flex justify-between items-center space-x-8">
                <Paragraph className="uppercase text-3xl text-accent font-bold tracking-widest line-clamp-1">
                    Credit Card
                </Paragraph>
                <Button className="flex space-x-2 items-center text-red-600 text-sm" type="button" onClick={deleteCard}>
                    {deleting.loading ? (
                        <LoadingBox className="!text-red-600 !text-lg" />
                    ) : (
                        <span>
                            <i className="mt-1.5 fa fa-trash" />
                        </span>
                    )}
                    <Paragraph className="underline select-none cursor-pointer underline-offset-2">
                        {deleting.loading ? "Removing" : "Remove"}
                    </Paragraph>
                </Button>
            </div>

            {deleting.errors.message && <MessageBox>{deleting.errors.message}</MessageBox>}

            <div className="overflow-x-auto w-full pb-2 scroll-bar">
                <CreditCard creditCard={creditCard} />
            </div>

            <div className="border-dashed relative lg:flex-row lg:space-y-0 lg:space-x-6 flex-shrink-0 flex-col space-y-6 items-center border-2 text-white/80 flex border-accent/40 p-6">
                <OrderInfoPieceCard title="Name" body={creditCard.billing_details.name} />
                <OrderInfoSeperator />

                <OrderInfoPieceCard title="Email" body={creditCard.billing_details.email} />
                <OrderInfoSeperator />

                <OrderInfoPieceCard title="Phone" body={creditCard.billing_details.phone} />
            </div>

            {creditCard.billing_details.address.country && (
                <div className="border-dashed relative lg:flex-row lg:space-y-0 lg:space-x-6 flex-shrink-0 flex-col space-y-6 items-center border-2 text-white/80 flex border-accent/40 p-6">
                    {creditCard.billing_details.address.country && (
                        <>
                            <OrderInfoPieceCard title="Country" body={creditCard.billing_details.address.country} />
                            <OrderInfoSeperator />
                        </>
                    )}

                    {creditCard.billing_details.address.line1 && (
                        <>
                            <OrderInfoPieceCard title="line 1" body={creditCard.billing_details.address.line1} />
                            <OrderInfoSeperator />
                        </>
                    )}

                    {creditCard.billing_details.address.line2 && (
                        <>
                            <OrderInfoPieceCard title="line 2" body={creditCard.billing_details.address.line2} />
                            <OrderInfoSeperator />
                        </>
                    )}

                    {creditCard.billing_details.address.city && (
                        <>
                            <OrderInfoPieceCard title="City" body={creditCard.billing_details.address.city} />
                            <OrderInfoSeperator />
                        </>
                    )}

                    {creditCard.billing_details.address.state && (
                        <>
                            <OrderInfoPieceCard title="State" body={creditCard.billing_details.address.state} />
                            <OrderInfoSeperator />
                        </>
                    )}

                    {creditCard.billing_details.address.postal_code && (
                        <OrderInfoPieceCard title="Postal Code" body={creditCard.billing_details.address.postal_code} />
                    )}
                </div>
            )}
        </div>
    );
};

export default CreditCardScreen;
