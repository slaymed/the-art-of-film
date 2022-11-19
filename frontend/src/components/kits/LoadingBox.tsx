import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import TextHeader from "../elements/TextHeader";

export interface LoadingBoxProps extends ComponentProps<"div"> {}

const LoadingBox: FC<LoadingBoxProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("flex space-x-4 items-center text-3xl", { [className]: className })}>
            <i className="fa fa-spinner fa-spin" />
        </div>
    );
};

export default LoadingBox;
