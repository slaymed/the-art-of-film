import { FC, ComponentProps, useCallback, useEffect } from "react";

import { useDispatch } from "../../hooks/useDispatch";
import { socket } from "../../App";

import { fireOrderRemoved_RT } from "../../store/orders/actions";
import { RealtimeResponseType } from "../../store/types";
import { fireChatRemoved_RT } from "../../store/chat/actions";

export interface OrderPaymentRefundedProps extends ComponentProps<"div"> {}

const OrderPaymentRefunded: FC<OrderPaymentRefundedProps> = () => {
    const dispatch = useDispatch();

    const orderPaymentRefunded = useCallback(
        ({ success, data }: RealtimeResponseType<{ chatId: string; orderId: string }>) => {
            if (!success) return;

            dispatch(fireOrderRemoved_RT(data.orderId));
            dispatch(fireChatRemoved_RT(data.chatId));
        },
        [dispatch]
    );

    useEffect(() => {
        socket.on("order-paiment-refunded", orderPaymentRefunded);
        return () => socket.removeListener("order-paiment-refunded", orderPaymentRefunded) as any;
    }, [orderPaymentRefunded]);

    return null;
};

export default OrderPaymentRefunded;
