import React, { FC, ComponentProps, memo } from "react";
import { useSelector } from "react-redux";

import { pendingWithdrawRequests } from "../../../store/withdraw-requests/selectors";
import WithdrawRequestsList from "./WithdrawRequestsList";

export interface PendingWithdrawRequestsListProps extends ComponentProps<"div"> {}

const PendingWithdrawRequestsList: FC<PendingWithdrawRequestsListProps> = (props) => {
    const pendingRequests = useSelector(pendingWithdrawRequests);

    return <WithdrawRequestsList {...props} withdrawRequests={pendingRequests} />;
};

export default memo(PendingWithdrawRequestsList);
