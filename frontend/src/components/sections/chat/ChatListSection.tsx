import React, { FC, ComponentProps, useMemo, useCallback, memo, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../../../hooks/useDispatch";

import { buyersMapList, selectedChatList, sellersMapList } from "../../../store/chat/selectors";
import { SelectedChatList } from "../../../store/chat/enums";
import { selectChatList, updateChatId } from "../../../store/chat/actions";
import { readChat } from "../../../store/chat/thnuks";
import { user } from "../../../store/auth/selectors";
import { ChatList } from "../../../store/chat/types";

import Paragraph from "../../elements/Paragraph";
import ChatReadBadge from "../../kits/chat/ChatReadBadge";
import ChatWatchedBadge from "../../kits/chat/ChatWatchedBadge";
import { useSearchParams } from "react-router-dom";

export interface ChatListSectionProps extends ComponentProps<"div"> {}

const ChatListSection: FC<ChatListSectionProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const [usp, setUsp] = useSearchParams();
    const pannel = (usp.get("pannel") || SelectedChatList.SELLERS) as SelectedChatList;

    const buyersList = useSelector(buyersMapList);
    const sellersList = useSelector(sellersMapList);
    const selectedList = useSelector(selectedChatList);
    const userInfo = useSelector(user);

    const list = useMemo(() => {
        if (selectedList === SelectedChatList.SELLERS) return sellersList;
        return buyersList;
    }, [selectedList, buyersList, sellersList]);

    const selectChat = (chatList: ChatList) => {
        if (!userInfo) return;

        dispatch(updateChatId(chatList._id));

        if (!chatList.watched) dispatch(readChat({ chatId: chatList._id, user: userInfo }));
    };

    useEffect(() => {
        dispatch(selectChatList(pannel));
    }, [pannel]);

    return (
        <div
            {...rest}
            className={classNames("flex w-full h-full flex-col space-y-3 bg-gray-500/5", {
                [className]: className,
            })}
        >
            <div className="flex space-x-2 bg-gray-500/5 flex-shrink-0">
                <div
                    className={classNames("w-1/2 p-4 text-center cursor-pointer", {
                        "bg-accent/80 text-black": selectedList === SelectedChatList.BUYERS,
                    })}
                    onClick={() => setUsp({ pannel: SelectedChatList.BUYERS })}
                >
                    <Paragraph className="text-sm font-bold tracking-wider">Clients</Paragraph>
                </div>
                <div
                    className={classNames("w-1/2 p-4 text-center cursor-pointer", {
                        "bg-accent/80 text-black": selectedList === SelectedChatList.SELLERS,
                    })}
                    onClick={() => setUsp({ pannel: SelectedChatList.SELLERS })}
                >
                    <Paragraph className="text-sm font-bold tracking-wider">Sellers</Paragraph>
                </div>
            </div>

            <div className="h-full flex-col flex overflow-y-auto scroll-bar overflow-x-hidden">
                {list.map((chat) => (
                    <div
                        className={classNames("flex flex-col px-4 cursor-pointer hover:bg-white/5 py-3", {
                            "bg-white/5": chat.selected,
                        })}
                        onClick={() => selectChat(chat)}
                        key={chat._id}
                    >
                        <Paragraph
                            className={classNames("text-sm font-bold text-tcolor/80 tracking-wider", {
                                "!text-blue-500": !chat.watched,
                            })}
                        >
                            {chat.name}
                        </Paragraph>
                        <div className="flex justify-between items-center space-x-4">
                            <Paragraph
                                className={classNames("text-xs text-tcolor/40 truncate", {
                                    "!text-blue-400": !chat.watched,
                                    "!text-accent/80": chat.lastMessage.isStatus,
                                })}
                            >
                                {chat.lastMessage.body ? chat.lastMessage.body : "Say hi"}
                            </Paragraph>
                            <ChatReadBadge iconOnly seen={chat.seen && chat.lastMessage.from === userInfo?._id} />
                            <ChatWatchedBadge watched={chat.watched} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(ChatListSection);
