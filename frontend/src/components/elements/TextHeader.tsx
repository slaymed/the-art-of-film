import classNames from "classnames";
import React, { FC, ComponentProps } from "react";

export interface TextHeaderProps extends ComponentProps<"h2"> {
    className: string;
}

const TextHeader: FC<TextHeaderProps> = ({ className = "", children, ...rest }) => {
    return (
        <h2 className={classNames("tracking-wide", { [className]: className })} {...rest}>
            {children}
        </h2>
    );
};

export default TextHeader;
