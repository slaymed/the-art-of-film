import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface ButtonProps extends ComponentProps<"button"> {}

const Button: FC<ButtonProps> = ({ className = "", ...rest }) => {
    return <button {...rest} className={classNames("", { [className]: className })} />;
};

export default Button;
