import { FC, memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "../../hooks/useDispatch";
import { socket } from "../../App";

import { RealtimeResponseType } from "../../store/types";
import { IOrder } from "../../store/orders/types";
import { IMessage } from "../../store/chat/types";
import { fireMessageRecieved_RT } from "../../store/chat/actions";
import { fireOrderRecieved_RT } from "../../store/orders/actions";
import { User } from "../../store/auth/types";
import { selectedChatId } from "../../store/chat/selectors";
import { readChat } from "../../store/chat/thnuks";

export interface OrderStatusChangedProps {
    user: User;
}

const OrderStatusChanged: FC<OrderStatusChangedProps> = ({ user }) => {
    const dispatch = useDispatch();

    const chatId = useSelector(selectedChatId);

    const orderStatusChanged = useCallback(
        ({ success, data }: RealtimeResponseType<{ order: IOrder; message: IMessage }>) => {
            if (!success) return;

            dispatch(fireMessageRecieved_RT(data.message));
            if (data.message.chatId === chatId) dispatch(readChat({ chatId, user }));
            dispatch(fireOrderRecieved_RT(data.order));
        },
        [dispatch, user, chatId]
    );

    useEffect(() => {
        socket.on("order-status-change", orderStatusChanged);
        return () => socket.removeListener("order-status-change", orderStatusChanged) as any;
    }, [orderStatusChanged]);

    return null;
};

export default memo(OrderStatusChanged);
