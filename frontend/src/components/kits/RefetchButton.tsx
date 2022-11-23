import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Button from "../elements/Button";

export interface RefetchButtonProps extends ComponentProps<"button"> {}

const RefetchButton: FC<RefetchButtonProps> = ({ className = "", ...rest }) => {
    return (
        <Button
            {...rest}
            className={classNames(
                "flex py-0.5 px-2 rounded bg-accent/20 hover:bg-accent hover:text-black items-center space-x-2 text-accent",
                { [className]: className }
            )}
            type="button"
        >
            <span>
                <i className="text-sm sm:text-xl fa fa-refresh" aria-hidden="true" />
            </span>
        </Button>
    );
};

export default RefetchButton;
