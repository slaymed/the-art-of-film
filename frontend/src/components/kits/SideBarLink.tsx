import React, { FC } from "react";
import classNames from "classnames";
import { Link, LinkProps } from "react-router-dom";

import TextHeader from "../elements/TextHeader";

export interface SideBarLinkProps extends LinkProps {
    iconClasses: string;
    text: string;
}

const SideBarLink: FC<SideBarLinkProps> = ({ className = "", iconClasses, text, ...rest }) => {
    return (
        <Link {...rest}>
            <div className={classNames("flex items-center space-x-2", { [className]: className })}>
                <span>
                    <i className={classNames("text-xl", { [iconClasses]: iconClasses })} />
                </span>
                <TextHeader className="text-lg" style={{ marginTop: 1 }}>
                    {text}
                </TextHeader>
            </div>
        </Link>
    );
};

export default SideBarLink;
