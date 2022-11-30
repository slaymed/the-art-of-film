import React, { FC, ComponentProps, useState, FormEvent } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Paragraph from "../components/elements/Paragraph";
import AppInput from "../components/elements/AppInput";
import LoadingBox from "../components/kits/LoadingBox";
import Button from "../components/elements/Button";
import TextHeader from "../components/elements/TextHeader";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";

import { raisingIssue } from "../store/issues/selectors";
import { raiseIssue } from "../store/issues/thunks";
import { RequestLifeCycle } from "../store/enums";
import { IIssue } from "../store/issues/types";
import { GlobalMessage, ThunkResponseType } from "../store/types";

import { useDispatch } from "../hooks/useDispatch";

export interface RaiseIssueScreenProps extends ComponentProps<"div"> {}

const RaiseIssueScreen: FC<RaiseIssueScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { orderId } = useParams();

    const { loading, errors } = useSelector(raisingIssue);

    const [becauseOf, setBecauseOf] = useState("");

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!orderId || !becauseOf) return;

        const res = await dispatch(raiseIssue({ becauseOf, orderId }));
        const { status } = res.payload as ThunkResponseType<IIssue[], GlobalMessage>;
        if (status === RequestLifeCycle.FAILED) return;

        setBecauseOf("");

        navigate(`/issues/${orderId}`);
    };

    return (
        <div
            {...rest}
            className={classNames("flex flex-col space-y-8 p-8 sm:p-16 bg-light-dark", { [className]: className })}
        >
            <form className="flex flex-col max-w-2xl mx-auto space-y-6 form w-full" onSubmit={handleSubmit}>
                <Paragraph className="text-2xl sm:text-3xl  uppercase text-accent font-bold tracking-widest">
                    Raise An Issue
                </Paragraph>

                <div className="flex flex-col">
                    <label htmlFor="because_of">Because of</label>
                    <AppInput
                        type="text"
                        id="because_of"
                        name="because_of"
                        placeholder="Because Of"
                        required
                        value={becauseOf}
                        onChange={({ target }) => setBecauseOf(target.value)}
                    />
                </div>

                {loading && <LoadingBox className="mx-auto" />}

                <ErrorWithRedirect errors={errors} loading={loading} className="items-center" />

                <Button className="p-3 text-black bg-accent" type="submit" disabled={loading}>
                    <TextHeader className="text-xl">Raise an issue</TextHeader>
                </Button>
            </form>
        </div>
    );
};

export default RaiseIssueScreen;
