import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface AppInputProps extends ComponentProps<"input"> {}

const AppInput: FC<AppInputProps> = ({ className = "", ...rest }) => {
    return <input {...rest} className={classNames("p-3 text-black", { [className]: className })} />;
};

export default AppInput;
