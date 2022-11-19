import React, { FC, ComponentProps, useState, ChangeEvent, FormEvent } from "react";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "../hooks/useDispatch";
import { finishResetPassword } from "../store/auth/thunks";
import { GlobalMessage, ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";
import H1 from "../components/elements/H1";
import TextHeader from "../components/elements/TextHeader";
import Button from "../components/elements/Button";
import { useSelector } from "react-redux";
import MessageBox from "../components/kits/MessageBox";
import LoadingBox from "../components/kits/LoadingBox";
import { finishingPasswordReset } from "../store/auth/selectors";
import AppInput from "../components/elements/AppInput";

export interface ResetPasswordScreenProps extends ComponentProps<"div"> {}

const ResetPasswordScreen: FC<ResetPasswordScreenProps> = ({ className = "", style = {}, ...rest }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token = "" } = useParams();

    const [{ password, confirmPassword }, setVars] = useState({ password: "", confirmPassword: "" });
    const reset = useSelector(finishingPasswordReset);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const finishPasswordChange = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) return alert("Passwords must match");

        const res = await dispatch(finishResetPassword({ password, token }));

        const { status } = res.payload as ThunkResponseType<GlobalMessage, GlobalMessage>;
        if (status === RequestLifeCycle.SUCCESS) navigate("/signin");
    };

    return (
        <div {...rest} className={classNames("bg-light-dark py-24 w-full px-8", { [className]: className })}>
            <form className="flex flex-col max-w-2xl mx-auto space-y-6 form" onSubmit={finishPasswordChange}>
                <H1 className="text-5xl">Reset Password</H1>

                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <AppInput
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Confirm Password</label>
                    <AppInput
                        type="password"
                        id="confirm-password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required
                        onChange={handleChange}
                    />
                </div>

                {reset.loading && <LoadingBox />}

                {reset.errors.message && (
                    <MessageBox className="text-center" variant="danger">
                        {reset.errors.message}
                    </MessageBox>
                )}

                <Button className="p-3 text-black bg-accent" type="submit" disabled={reset.loading}>
                    <TextHeader className="text-xl">Reset Password</TextHeader>
                </Button>
            </form>
        </div>
    );
};

export default ResetPasswordScreen;
