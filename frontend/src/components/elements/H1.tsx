import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface H1Props extends ComponentProps<"h1"> {
    className: string;
}

const H1: FC<H1Props> = ({ className = "", children, ...rest }) => {
    return (
        <h1 {...rest} className={classNames("tracking-widest", { [className]: className })}>
            {children}
        </h1>
    );
};

export default H1;
