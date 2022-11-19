import { FC, useCallback, useEffect } from "react";

import { fireChatSeen_RT } from "../../store/chat/actions";
import { RealtimeResponseType } from "../../store/types";
import { IChat } from "../../store/chat/types";

import { useDispatch } from "../../hooks/useDispatch";
import { socket } from "../../App";

export interface ChatSeenProps {}

const ChatSeen: FC<ChatSeenProps> = () => {
    const dispatch = useDispatch();

    const chatSeen = useCallback(
        ({ success, data }: RealtimeResponseType<IChat>) => {
            if (!success) return;
            dispatch(fireChatSeen_RT(data));
        },
        [dispatch]
    );

    useEffect(() => {
        socket.on("chat-seen", chatSeen);
        return () => socket.removeListener("chat-seen", chatSeen) as any;
    }, [chatSeen]);

    return null;
};

export default ChatSeen;
