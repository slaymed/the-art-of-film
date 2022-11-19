import { memo } from "react";
import { useSelector } from "react-redux";

import { user } from "../../store/auth/selectors";

import OrderStatusChanged from "../realtime-listeners/OrderStatusChanged";
import ChatSeen from "../realtime-listeners/ChatSeen";
import MesageRecieved from "../realtime-listeners/MesageRecieved";
import OrderPaid from "../realtime-listeners/OrderPaid";
import OrderPaymentRefunded from "../realtime-listeners/OrderPaymentRefunded";

const RegisterSharedRealtimeEventsCard = () => {
    const userInfo = useSelector(user);
    if (!userInfo) return null;

    return (
        <>
            <OrderStatusChanged user={userInfo} />
            <MesageRecieved user={userInfo} />
            <ChatSeen />
            <OrderPaid />
            <OrderPaymentRefunded />
        </>
    );
};

export default memo(RegisterSharedRealtimeEventsCard);
