import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { selectedChatMessages } from "../../../store/chat/selectors";
import { user } from "../../../store/auth/selectors";

import Message from "../../kits/chat/Message";
import Paragraph from "../../elements/Paragraph";

export interface ChatMessagesListProps extends ComponentProps<"div"> {}

const ChatMessagesList: FC<ChatMessagesListProps> = ({ className = "", ...rest }) => {
    const messages = useSelector(selectedChatMessages);
    const userInfo = useSelector(user);

    return (
        <div
            {...rest}
            className={classNames(
                "h-full px-4 py-2 space-y-2 flex flex-col-reverse scroll-bar overflow-x-hidden overflow-y-auto",
                { [className]: className, "border-b border-white/5": messages }
            )}
        >
            {messages ? (
                messages.map((message, index) => (
                    <Message
                        key={message._id}
                        myMessage={message.from === userInfo?._id}
                        lastMessage={index === 0}
                        message={message}
                    />
                ))
            ) : (
                <div className="flex h-full items-center justify-center">
                    <Paragraph className="text-sm text-white/40">Your messages will show here!</Paragraph>
                </div>
            )}
        </div>
    );
};

export default memo(ChatMessagesList);
