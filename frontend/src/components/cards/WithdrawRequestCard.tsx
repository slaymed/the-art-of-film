import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { WithdrawRequest, WithdrawRequestErrors, WithdrawRequestsRes } from "../../store/withdraw-requests/types";
import Paragraph from "../elements/Paragraph";
import { AccountType, WithdrawStatus } from "../../store/withdraw-requests/enums";
import { useSelector } from "react-redux";
import { user } from "../../store/auth/selectors";
import Button from "../elements/Button";
import { useDispatch } from "../../hooks/useDispatch";
import { cancelWithdrawRequest } from "../../store/withdraw-requests/thunks";
import { cancelingWithdrawRequest } from "../../store/withdraw-requests/selectors";
import LoadingBox from "../kits/LoadingBox";
import { ThunkResponseType } from "../../store/types";
import { RequestLifeCycle } from "../../store/enums";
import { fireUserUpdated_RT } from "../../store/auth/actions";

export interface WithdrawRequestCardProps extends ComponentProps<"div"> {
    request: WithdrawRequest;
}

const WithdrawRequestCard: FC<WithdrawRequestCardProps> = ({ className = "", request, ...rest }) => {
    const dispatch = useDispatch();

    const userInfo = useSelector(user);
    const canceling = useSelector(cancelingWithdrawRequest);

    const cancel = async () => {
        const res = await dispatch(cancelWithdrawRequest(request._id));

        const { status, data } = res.payload as ThunkResponseType<WithdrawRequestsRes, WithdrawRequestErrors>;
        if (status !== RequestLifeCycle.SUCCESS || !data) return;

        dispatch(fireUserUpdated_RT(data.user));
    };

    if (!userInfo) return null;

    return (
        <div
            {...rest}
            className={classNames(
                "p-4 bg-dark-card flex flex-wrap capitalize gap-4 text-sm items-center font-bold tracking-wider",
                {
                    [className]: className,
                }
            )}
        >
            <Paragraph className="bg-accent/20 py-1.5 px-4 rounded text-accent">£{request.amount}</Paragraph>

            <Paragraph
                className={classNames("py-1.5 px-4 rounded", {
                    "text-blue-500 bg-blue-500/20": request.status === WithdrawStatus.PENDING,
                    "text-green-500 bg-green-500/20": request.status === WithdrawStatus.PAID,
                    "text-red-600 bg-red-600/20": request.status === WithdrawStatus.REJECTED,
                })}
            >
                {request.status}
            </Paragraph>

            {request.to.accountType === AccountType.BANK_ACCOUNT && request.to.bank_account && (
                <>
                    <Paragraph className="text-teal-500 bg-teal-500/20 py-1.5 rounded px-4">
                        Withdraw To Bank Account
                    </Paragraph>
                    <Paragraph className="text-teal-500 bg-teal-500/20 py-1.5 rounded px-4">
                        {request.to.bank_account.account_name}
                    </Paragraph>
                    <Paragraph className="text-teal-500 bg-teal-500/20 py-1.5 rounded px-4">
                        {request.to.bank_account.account_number}
                    </Paragraph>
                </>
            )}

            {request.to.accountType === AccountType.PAYPAL_ACCOUNT && request.to.paypal_account && (
                <>
                    <Paragraph className="text-blue-500 bg-blue-500/20 py-1.5 rounded px-4">
                        Withdraw To Paypal
                    </Paragraph>
                    <Paragraph className="text-blue-500 normal-case bg-blue-500/20 py-1.5 rounded px-4">
                        {request.to.paypal_account.email}
                    </Paragraph>
                </>
            )}

            {request.rejected_because && (
                <Paragraph className="text-slate-400 bg-slate-400/20 py-1.5 rounded px-4">
                    Rejected Because Of {request.rejected_because}
                </Paragraph>
            )}

            {request.status === WithdrawStatus.PENDING && request.user === userInfo._id && (
                <Button type="button" className="text-red-600 bg-red-600/20 py-1.5 rounded px-4" onClick={cancel}>
                    {canceling.loading ? (
                        <LoadingBox style={{ fontSize: 20 }} />
                    ) : (
                        <Paragraph className="underline underline-offset-2">Cancel</Paragraph>
                    )}
                </Button>
            )}
        </div>
    );
};

export default WithdrawRequestCard;
