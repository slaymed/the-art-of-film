import React, { FC, ComponentProps, FormEvent, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import Paragraph from "../components/elements/Paragraph";
import AppInput from "../components/elements/AppInput";
import Button from "../components/elements/Button";
import TextHeader from "../components/elements/TextHeader";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";

import { useDispatch } from "../hooks/useDispatch";

import { redeemGiftSub } from "../store/subscription/thunks";
import { redeemOperation } from "../store/subscription/selectors";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { GiftSub } from "../store/subscription/types";
import { RequestLifeCycle } from "../store/enums";
import { useNavigate } from "react-router-dom";

export interface RedeemGiftSubScreenProps extends ComponentProps<"div"> {}

const RedeemGiftSubScreen: FC<RedeemGiftSubScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const redeem = useSelector(redeemOperation);

    const [code, setCode] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await dispatch(redeemGiftSub(code));
        const { status, data: giftSub } = res.payload as ThunkResponseType<GiftSub, GlobalMessage>;
        if (status !== RequestLifeCycle.SUCCESS || !giftSub) return;

        navigate("/my-subscription");
    };

    return (
        <div
            {...rest}
            className={classNames("flex flex-col space-y-8 p-8 sm:p-16 bg-light-dark", { [className]: className })}
        >
            <form className="flex flex-col max-w-2xl mx-auto space-y-6 form w-full" onSubmit={handleSubmit}>
                <Paragraph className="text-2xl sm:text-3xl  uppercase text-accent font-bold tracking-widest">
                    Redeem Gift Sub Code
                </Paragraph>

                <div className="flex flex-col">
                    <label htmlFor="code">Code</label>
                    <AppInput
                        type="text"
                        id="code"
                        name="code"
                        placeholder="Code"
                        required
                        value={code}
                        onChange={({ target }) => setCode(target.value)}
                    />
                </div>

                {redeem.loading && <LoadingBox />}

                <ErrorWithRedirect {...redeem} />

                <Button className="p-3 text-black bg-accent" type="submit" disabled={redeem.loading}>
                    <TextHeader className="text-xl">Redeem</TextHeader>
                </Button>
            </form>
        </div>
    );
};

export default RedeemGiftSubScreen;
