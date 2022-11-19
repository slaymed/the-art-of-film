import React, { FC, ComponentProps, useState, useEffect, FormEvent, ChangeEvent } from "react";
import classNames from "classnames";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { SigninErrors, SignInVars, User } from "../store/auth/types";
import { fetchingUserOperation, signinOperation, user } from "../store/auth/selectors";
import { resetPassword, signin } from "../store/auth/thunks";
import { ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";

import LoadingBox from "../components/kits/LoadingBox";
import MessageBox from "../components/kits/MessageBox";
import H1 from "../components/elements/H1";
import Button from "../components/elements/Button";
import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";
import AppInput from "../components/elements/AppInput";

import { loadUserRelated } from "../helpers/load-user-related";

export interface SigninScreenProps extends ComponentProps<"div"> {}

const initialState: SignInVars = {
    email: "",
    password: "",
};

const SigninScreen: FC<SigninScreenProps> = ({ className = "", style = {}, ...rest }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [urlSearchParams, setSearchParams] = useSearchParams();
    const redirect = urlSearchParams.get("redirect");

    const [vars, setVars] = useState(initialState);

    const userInfo = useSelector(user);
    const fetching = useSelector(fetchingUserOperation);
    const { loading, errors } = useSelector(signinOperation);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSignin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const res = await dispatch(signin(vars));

        const { status } = res.payload as ThunkResponseType<User, SigninErrors>;

        if (status === RequestLifeCycle.SUCCESS) {
            loadUserRelated(dispatch);
            if (redirect) navigate(redirect);
        }
    };

    const hadnlePasswordReset = () => dispatch(resetPassword({ email: vars.email }));

    useEffect(() => {
        if (userInfo && redirect) navigate(redirect);
    }, [userInfo, navigate, redirect]);

    return (
        <div {...rest} className={classNames("bg-light-dark py-24 w-full px-8", { [className]: className })}>
            <form className="flex flex-col max-w-2xl mx-auto space-y-6 form w-full" onSubmit={handleSignin}>
                <H1 className="text-5xl">Sign In</H1>

                <div className="flex flex-col">
                    <label htmlFor="email">Email address</label>
                    <AppInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        required
                        value={vars.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <AppInput
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                        value={vars.password}
                        onChange={handleChange}
                    />
                </div>

                {(loading || fetching.loading) && <LoadingBox />}

                {errors.message && (
                    <MessageBox className="text-center" variant="danger">
                        {errors.message}
                    </MessageBox>
                )}

                <Button className="p-3 text-black bg-accent" type="submit" disabled={loading || fetching.loading}>
                    <TextHeader className="text-xl">Sign in</TextHeader>
                </Button>

                <Button
                    className="p-3 text-black bg-white"
                    type="button"
                    onClick={hadnlePasswordReset}
                    disabled={loading || fetching.loading}
                >
                    <TextHeader className="text-xl">Forgot password?</TextHeader>
                </Button>

                <Paragraph>
                    New customer?{" "}
                    <Link className="text-accent" to={`/register?redirect=${redirect}`}>
                        Create your account
                    </Link>
                </Paragraph>
            </form>
        </div>
    );
};

export default SigninScreen;
