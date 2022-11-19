import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

export interface ChatWatchedBadgeProps extends ComponentProps<"div"> {
    watched?: boolean;
}

const ChatWatchedBadge: FC<ChatWatchedBadgeProps> = ({ className = "", watched = true, ...rest }) => {
    if (watched) return null;
    return (
        <div
            {...rest}
            className={classNames("bg-blue-500 flex-shrink-0 w-3 h-3 rounded-full", { [className]: className })}
        />
    );
};

export default ChatWatchedBadge;
