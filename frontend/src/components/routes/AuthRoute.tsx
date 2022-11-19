import React, { FC, useEffect, ComponentProps } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchingUserOperation, user } from "../../store/auth/selectors";

export interface AuthRouteProps extends ComponentProps<"div"> {}

const AuthRoute: FC<AuthRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    const userInfo = useSelector(user);
    const { loading } = useSelector(fetchingUserOperation);

    useEffect(() => {
        if (!loading && !userInfo) navigate(`/signin?redirect=${window.location.pathname}`);
    }, [loading, userInfo, navigate]);

    if (!userInfo) return null;

    return <>{children}</>;
};

export default AuthRoute;
