import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Paragraph from "../../elements/Paragraph";

export interface ChatReadBadgeProps extends ComponentProps<"div"> {
    seen?: boolean;
    iconOnly?: boolean;
}

const ChatReadBadge: FC<ChatReadBadgeProps> = ({ className = "", seen, iconOnly = false, ...rest }) => {
    if (!seen) return null;

    return (
        <div
            {...rest}
            className={classNames("flex space-x-2 flex-shrink-0 text-xs items-center text-accent", {
                [className]: className,
            })}
        >
            <span className="flex items-center justify-center">
                <i className="fa-sharp fa-solid fa-check-double" />
            </span>
            {!iconOnly && <Paragraph>Seen</Paragraph>}
        </div>
    );
};

export default ChatReadBadge;
