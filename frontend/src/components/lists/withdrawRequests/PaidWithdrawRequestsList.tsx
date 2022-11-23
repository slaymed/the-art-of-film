import React, { FC, ComponentProps, memo } from "react";
import { useSelector } from "react-redux";

import { paidWithdrawRequests } from "../../../store/withdraw-requests/selectors";
import WithdrawRequestsList from "./WithdrawRequestsList";

export interface PaidWithdrawRequestsListProps extends ComponentProps<"div"> {}

const PaidWithdrawRequestsList: FC<PaidWithdrawRequestsListProps> = (props) => {
    const paidRequests = useSelector(paidWithdrawRequests);

    return <WithdrawRequestsList {...props} withdrawRequests={paidRequests} />;
};

export default memo(PaidWithdrawRequestsList);
