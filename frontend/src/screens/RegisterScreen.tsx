import React, { FC, ComponentProps, useState, ChangeEvent, FormEvent, useEffect } from "react";
import classNames from "classnames";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { RegisterErrors, RegisterVars, User } from "../store/auth/types";
import { fetchingUserOperation, registerOperation, user } from "../store/auth/selectors";
import { register } from "../store/auth/thunks";
import { ThunkResponseType } from "../store/types";
import { RequestLifeCycle } from "../store/enums";

import MessageBox from "../components/kits/MessageBox";
import LoadingBox from "../components/kits/LoadingBox";
import H1 from "../components/elements/H1";
import TextHeader from "../components/elements/TextHeader";
import Button from "../components/elements/Button";
import Paragraph from "../components/elements/Paragraph";
import AppInput from "../components/elements/AppInput";

import { loadUserRelated } from "../helpers/load-user-related";

export interface RegisterProps extends ComponentProps<"div"> {}

const initialState: RegisterVars = {
    email: "",
    name: "",
    password: "",
    sellerName: "",
};

const Register: FC<RegisterProps> = ({ className = "", ...rest }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [urlSearchParams, setSearchParams] = useSearchParams();
    const redirect = urlSearchParams.get("redirect");

    const { loading, errors } = useSelector(registerOperation);
    const userInfo = useSelector(user);
    const fetching = useSelector(fetchingUserOperation);

    const [vars, setVars] = useState(initialState);
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (confirmPassword !== vars.password) return alert("Password and confirm password are not match");

        const res = await dispatch(register(vars));

        const { status } = res.payload as ThunkResponseType<User, RegisterErrors>;

        if (status === RequestLifeCycle.SUCCESS) {
            loadUserRelated(dispatch);
            navigate("/payment-methods/credit-cards/add");
        }
    };

    useEffect(() => {
        if (userInfo && redirect) navigate(redirect);
    }, [userInfo, navigate, redirect]);

    return (
        <div {...rest} className={classNames("bg-light-dark py-24 w-full px-8", { [className]: className })}>
            <form className="flex flex-col max-w-2xl mx-auto space-y-6 w-full form" onSubmit={handleSubmit}>
                <H1 className="text-6xl text-center text-accent">Create Account</H1>

                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <AppInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        required
                        value={vars.name}
                        onChange={handleChange}
                    />
                </div>
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
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <AppInput
                        type="password"
                        id="confirmPassword"
                        placeholder="Enter confirm password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="_name">Collection Name</label>
                    <AppInput
                        id="_name"
                        name="sellerName"
                        type="text"
                        placeholder="Enter Seller Name"
                        value={vars.sellerName}
                        onChange={handleChange}
                    />
                </div>

                {/* <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name={"description"}
            type="text"
            placeholder="Enter Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div> */}

                {(loading || fetching.loading) && <LoadingBox />}

                {errors.message && (
                    <MessageBox className="text-center" variant="danger">
                        {errors.message}
                    </MessageBox>
                )}

                <Button className="p-3 text-black bg-accent" type="submit" disabled={loading || fetching.loading}>
                    <TextHeader className="text-xl">Register</TextHeader>
                </Button>

                <Paragraph>
                    Already have an account?{" "}
                    <Link className="text-accent" to={`/signin`}>
                        Sign-In
                    </Link>
                </Paragraph>
            </form>
        </div>
    );
};

export default Register;
