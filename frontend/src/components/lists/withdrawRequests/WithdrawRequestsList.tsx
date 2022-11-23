import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { WithdrawRequest } from "../../../store/withdraw-requests/types";
import { fetchingWithdrawRequests } from "../../../store/withdraw-requests/selectors";

import MessageBox from "../../kits/MessageBox";
import WithdrawRequestCard from "../../cards/WithdrawRequestCard";
import LoadingBox from "../../kits/LoadingBox";

export interface WithdrawRequestsListProps extends ComponentProps<"div"> {
    withdrawRequests: WithdrawRequest[];
}

const WithdrawRequestsList: FC<WithdrawRequestsListProps> = ({ className = "", withdrawRequests, ...rest }) => {
    const fetching = useSelector(fetchingWithdrawRequests);

    if (fetching.loading) return <LoadingBox className="w-fit mx-auto" />;
    if (fetching.errors.message) return <MessageBox className="text-center">{fetching.errors.message}</MessageBox>;

    if (withdrawRequests.length === 0) return <MessageBox className="text-center">No Request</MessageBox>;

    return (
        <div {...rest} className={classNames("flex flex-col gap-4", { [className]: className })}>
            {withdrawRequests.map((request) => (
                <WithdrawRequestCard key={request._id} request={request} />
            ))}
        </div>
    );
};

export default memo(WithdrawRequestsList);
