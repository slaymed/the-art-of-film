import { FC, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { User } from "../../store/auth/types";
import { RealtimeResponseType } from "../../store/types";
import { IMessage } from "../../store/chat/types";
import { fireMessageRecieved_RT } from "../../store/chat/actions";
import { selectedChatId } from "../../store/chat/selectors";
import { readChat } from "../../store/chat/thnuks";

import { socket } from "../../App";
import { useDispatch } from "../../hooks/useDispatch";

export interface MesageRecievedProps {
    user: User;
}

const MesageRecieved: FC<MesageRecievedProps> = ({ user }) => {
    const dispatch = useDispatch();

    const chatId = useSelector(selectedChatId);

    const recievedMessage = useCallback(
        ({ success, data }: RealtimeResponseType<IMessage>) => {
            if (!success) return;

            dispatch(fireMessageRecieved_RT(data));
            if (data.chatId === chatId && user) dispatch(readChat({ chatId, user: user }));
        },
        [dispatch, chatId, user]
    );
    useEffect(() => {
        socket.on("recieve-message", recievedMessage);
        return () => socket.removeListener("recieve-message", recievedMessage) as any;
    }, [recievedMessage]);

    return null;
};

export default MesageRecieved;
