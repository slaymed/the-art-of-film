import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { selectedChatId } from "../store/chat/selectors";
import { updateChatId } from "../store/chat/actions";
import { useDispatch } from "../hooks/useDispatch";

import ChatListSection from "../components/sections/chat/ChatListSection";
import ChatMessagesSection from "../components/sections/chat/ChatMessagesSection";
import Paragraph from "../components/elements/Paragraph";
import ChatOrderSection from "../components/sections/chat/ChatOrderSection";

export interface ChatScreenProps extends ComponentProps<"div"> {}

const ChatScreen: FC<ChatScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const chatId = useSelector(selectedChatId);

    useEffect(() => () => dispatch(updateChatId(null)), [dispatch]);

    return (
        <div {...rest} className={classNames("flex flex-col p-8 space-y-8 bg-light-dark", { [className]: className })}>
            <div className="flex items-center space-x-6">
                <span>
                    <i className="text-5xl fa-solid fa-comments" />
                </span>
                <Paragraph className="text-5xl">Orders Chat</Paragraph>
            </div>

            <div className="flex flex-col h-fit lg:flex-row">
                <div className="w-full relative overflow-hidden lg:w-3/4 flex flex-shrink-0 h-[600px]">
                    <div
                        className={classNames("sm:w-1/3 w-full h-full duration-200", {
                            "opacity-0 sm:opacity-100": chatId,
                        })}
                    >
                        <ChatListSection />
                    </div>
                    <div
                        className={classNames(
                            "flex-shrink-0 absolute h-full duration-200 left-full sm:left-0 sm:border-l border-white/5 sm:relative w-full sm:w-2/3",
                            { [className]: className, "!left-0": chatId }
                        )}
                    >
                        <ChatMessagesSection />
                    </div>
                </div>
                <div className="flex-1 flex-shrink-0 w-full lg:border-l border-white/5 lg:w-1/4">
                    <ChatOrderSection />
                </div>
            </div>
        </div>
    );
};

export default ChatScreen;
