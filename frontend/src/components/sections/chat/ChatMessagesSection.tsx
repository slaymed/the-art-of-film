import React, { FC, ComponentProps, memo, useCallback, FormEvent, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../../../hooks/useDispatch";

import { chatSeenChecker, selectedChatId, selectedChatOppositeUser } from "../../../store/chat/selectors";
import { updateChatId } from "../../../store/chat/actions";
import { user } from "../../../store/auth/selectors";
import { sendMessage } from "../../../store/chat/thnuks";

import Paragraph from "../../elements/Paragraph";
import Button from "../../elements/Button";

import ChatReadBadge from "../../kits/chat/ChatReadBadge";
import ChatMessagesList from "../../lists/chat/ChatMessagesList";

export interface ChatMessagesSectionProps extends ComponentProps<"div"> {
    allowGoingBack?: boolean;
}

const ChatMessagesSection: FC<ChatMessagesSectionProps> = ({ className = "", allowGoingBack = true, ...rest }) => {
    const dispatch = useDispatch();

    const chatId = useSelector(selectedChatId);
    const seen = useSelector(chatSeenChecker);
    const oppositeUser = useSelector(selectedChatOppositeUser);
    const userInfo = useSelector(user);

    const [body, setBody] = useState("");

    const close = useCallback(() => dispatch(updateChatId(null)), [dispatch]);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!chatId || !userInfo || !body.trim()) return;

        const _id = Math.random().toString();

        dispatch(sendMessage({ body, _id, chatId, from: userInfo._id }));

        setBody("");
    };

    return (
        <div
            {...rest}
            className={classNames("w-full flex flex-col space-y-3 flex-shrink-0 h-full bg-gray-500/5", {
                [className]: className,
            })}
        >
            <div className="flex p-4 justify-between items-center bg-gray-500/5">
                <div className="flex items-center">
                    {allowGoingBack && (
                        <Button
                            className="w-12 flex sm:hidden h-12 mr-4 justify-center items-center hover:bg-white/5 duration-200 rounded-full"
                            type="button"
                            onClick={close}
                        >
                            <span>
                                <i className="text-lg fa-solid fa-arrow-left" />
                            </span>
                        </Button>
                    )}
                    <div className="flex space-x-2 items-center">
                        <Paragraph className="text-sm font-bold tracking-wider line-clamp-1">
                            {oppositeUser ? oppositeUser.name : "No Chat Selected"}
                        </Paragraph>
                        {oppositeUser && (
                            <Paragraph className="text-xs font-bold tracking-wider text-accent/80 line-clamp-1">
                                {oppositeUser.sellerName}
                            </Paragraph>
                        )}
                    </div>
                </div>
                <div className="flex space-x-4 items-center">
                    <ChatReadBadge seen={seen as boolean} />
                </div>
            </div>
            <ChatMessagesList />
            {chatId && (
                <form className="py-2 px-4 pt-0 flex space-x-4 items-center" onSubmit={handleSendMessage}>
                    <input
                        className="w-full bg-white/10 rounded-full py-1.5 px-4 text-sm font-light"
                        placeholder="Type to send"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                    <Button className="w-fit h-fit" type="submit">
                        <span>
                            <i className="text-3xl fa-brands fa-telegram" />
                        </span>
                    </Button>
                </form>
            )}
        </div>
    );
};

export default memo(ChatMessagesSection);
