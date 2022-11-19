import React, { FC, memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "../../../hooks/useDispatch";

import { updateChatId } from "../../../store/chat/actions";
import { selectedChatId } from "../../../store/chat/selectors";
import { readChat } from "../../../store/chat/thnuks";
import { User } from "../../../store/auth/types";

import ChatMessagesSection from "../../sections/chat/ChatMessagesSection";
import ChatOrderSection from "../../sections/chat/ChatOrderSection";
import Paragraph from "../../elements/Paragraph";
import Button from "../../elements/Button";

export interface OrderChatPageProps {
    chatId: string;
    user: User;
}

const OrderChatPage: FC<OrderChatPageProps> = ({ chatId, user }) => {
    const dispatch = useDispatch();

    const selectedId = useSelector(selectedChatId);

    const loadChatAndControls = useCallback(() => {
        dispatch(updateChatId(chatId));
        dispatch(readChat({ chatId, user }));
    }, [dispatch, chatId, user]);

    useEffect(() => () => dispatch(updateChatId(null)), [dispatch]);

    if (!selectedId)
        return (
            <Button className="px-6 py-2 mx-auto rounded-full bg-accent/80 w-fit" onClick={loadChatAndControls}>
                <Paragraph className="font-bold tracking-wider text-center text-black uppercase line-clamp-1">
                    load order chat and controlls
                </Paragraph>
            </Button>
        );

    return (
        <div className="flex flex-col space-y-8">
            <Paragraph className="text-3xl">Order Chat And Controlls</Paragraph>
            <div className="flex flex-col w-full md:flex-row">
                <div className="md:w-2/3 h-[600px]">
                    <ChatMessagesSection allowGoingBack={false} />
                </div>
                <div className="md:w-1/3 md:border-l border-white/5">
                    <ChatOrderSection />
                </div>
            </div>
        </div>
    );
};

export default memo(OrderChatPage);
