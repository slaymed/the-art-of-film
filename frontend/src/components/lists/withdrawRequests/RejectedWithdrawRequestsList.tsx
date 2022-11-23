import React, { FC, ComponentProps, memo } from "react";
import { useSelector } from "react-redux";

import { rejectedWithdrawRequests } from "../../../store/withdraw-requests/selectors";
import WithdrawRequestsList from "./WithdrawRequestsList";

export interface RejectedWithdrawRequestsListProps extends ComponentProps<"div"> {}

const RejectedWithdrawRequestsList: FC<RejectedWithdrawRequestsListProps> = (props) => {
    const rejectedRequests = useSelector(rejectedWithdrawRequests);

    return <WithdrawRequestsList {...props} withdrawRequests={rejectedRequests} />;
};

export default memo(RejectedWithdrawRequestsList);
