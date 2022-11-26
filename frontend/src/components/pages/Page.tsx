import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface PageProps extends ComponentProps<"div"> {}

const Page: FC<PageProps> = ({ className = "", ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("flex flex-col gap-8 p-8 sm:p-16 bg-light-dark", { [className]: className })}
        />
    );
};

export default Page;
