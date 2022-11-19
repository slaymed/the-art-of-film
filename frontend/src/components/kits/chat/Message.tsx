import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import { IMessage } from "../../../store/chat/types";

import Paragraph from "../../elements/Paragraph";

export interface MessageProps extends ComponentProps<"div"> {
    message: IMessage;
    lastMessage: boolean;
    myMessage: boolean;
}

const Message: FC<MessageProps> = ({ className = "", message, lastMessage, myMessage, ...rest }) => {
    if (!message) return null;

    return (
        <div
            {...rest}
            className={classNames("flex", {
                [className]: className,
                "justify-end": myMessage,
                "mt-2": lastMessage,
                "!justify-center py-4": message.isStatus,
            })}
        >
            <div className="flex space-x-2 items-end w-fit max-w-[80%]">
                <div className="flex flex-col space-y-1 w-full">
                    <div
                        className={classNames("px-3 py-2 w-full rounded-2xl bg-accent/60 break-all", {
                            "!bg-white/10": !myMessage,
                            "!bg-transparent text-center !px-0 !py-0": message.isStatus,
                        })}
                    >
                        <Paragraph
                            className={classNames("text-xs", { "!text-[10px] text-accent/80": message.isStatus })}
                        >
                            {message.body}
                        </Paragraph>
                    </div>
                    <Paragraph
                        className={classNames("text-white/20 !text-[10px]", { "text-center": message.isStatus })}
                    >
                        {dayjs().from(message.createdAt)}
                    </Paragraph>
                </div>
                {message.sending && (
                    <span className="flex justify-center items-center w-8 h-8 flex-shrink-0 ">
                        <i className="text-lg fa-solid fa-paper-plane animate-pulse" />
                    </span>
                )}
            </div>
        </div>
    );
};

export default Message;
