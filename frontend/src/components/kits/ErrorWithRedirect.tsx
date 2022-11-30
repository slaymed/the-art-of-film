import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { GlobalMessage } from "../../store/types";
import MessageBox from "./MessageBox";
import { Link } from "react-router-dom";
import Paragraph from "../elements/Paragraph";

export interface ErrorWithRedirectProps extends ComponentProps<"div"> {
    loading: boolean;
    errors: GlobalMessage;
    boxClasses?: string;
}

const ErrorWithRedirect: FC<ErrorWithRedirectProps> = ({
    className = "",
    loading,
    errors,
    boxClasses = "",
    ...rest
}) => {
    if (loading) return null;
    if (!errors.message && !errors.redirect) return null;

    return (
        <div {...rest} className={classNames("flex flex-col space-y-1", { [className]: className })}>
            {errors.message && <MessageBox className={boxClasses}>{errors.message}</MessageBox>}
            {errors.redirect && (
                <Link to={errors.redirect} className="w-fit">
                    <Paragraph className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm line-clamp-1">
                        Follow link
                    </Paragraph>
                </Link>
            )}
        </div>
    );
};

export default ErrorWithRedirect;
