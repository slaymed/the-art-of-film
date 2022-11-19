import { FC, useEffect, useCallback } from "react";

import { socket } from "../../App";
import { useDispatch } from "../../hooks/useDispatch";

import { RealtimeResponseType } from "../../store/types";
import { IChat } from "../../store/chat/types";
import { IOrder } from "../../store/orders/types";
import { fireOrderRecieved_RT } from "../../store/orders/actions";
import { fireChatCreated_RT } from "../../store/chat/actions";

export interface OrderPaidProps {}

const OrderPaid: FC<OrderPaidProps> = () => {
    const dispatch = useDispatch();

    const orderPaid = useCallback(
        ({ success, data }: RealtimeResponseType<{ chat: IChat; order: IOrder }>) => {
            if (!success) return;

            dispatch(fireOrderRecieved_RT(data.order));
            dispatch(fireChatCreated_RT(data.chat));
        },
        [dispatch]
    );

    useEffect(() => {
        socket.on("order-paid", orderPaid);
        return () => socket.removeListener("order-paid", orderPaid) as any;
    }, [orderPaid]);

    return null;
};

export default OrderPaid;
