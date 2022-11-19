import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import Paragraph from "../elements/Paragraph";
import Button from "../elements/Button";

import { IIssue } from "../../store/issues/types";
import { user } from "../../store/auth/selectors";
import { useDispatch } from "../../hooks/useDispatch";
import { solveIssue } from "../../store/issues/thunks";
import ErrorWithRedirect from "../kits/ErrorWithRedirect";
import { solvingIssue } from "../../store/issues/selectors";
import LoadingBox from "../kits/LoadingBox";

export interface IssueCardProps extends ComponentProps<"div"> {
    issue: IIssue;
}

const IssueCard: FC<IssueCardProps> = ({ className = "", issue, ...rest }) => {
    const dispatch = useDispatch();

    const userInfo = useSelector(user);
    const { errors, loading } = useSelector(solvingIssue);

    if (!issue || !userInfo) return null;

    const solve = () => {
        dispatch(solveIssue(issue._id));
    };

    return (
        <div {...rest} className={classNames("bg-dark-card p-8 flex flex-col space-y-8", { [className]: className })}>
            <div className="flex gap-4 flex-wrap justify-between items-center">
                <Paragraph className="text-lg sm:text-xl uppercase text-accent font-bold tracking-widest">
                    {issue.becauseOf}
                </Paragraph>
                <Paragraph
                    className={classNames("py-0.5 px-2  text-xs font-bold tracking-widest rounded", {
                        "bg-slate-400/20 text-slate-400": !issue.solved,
                        "bg-accent/20 text-accentbg-accent": issue.solved,
                    })}
                >
                    {issue.solved ? "Issue Solved" : "Not Solved Yet"}
                </Paragraph>
            </div>
            <div className="flex gap-4 flex-wrap items-center">
                <div className="flex flex-col space-y-4 overflow-hidden">
                    <Paragraph className="text-xs sm:text-sm uppercase text-slate-400 font-bold tracking-widest">
                        Order Id
                    </Paragraph>
                    <Paragraph className="text-xs sm:text-sm uppercase text-slate-500 font-bold tracking-widest">
                        {issue.order}
                    </Paragraph>
                </div>
                <div className="flex flex-col space-y-4 overflow-hidden">
                    <Paragraph className="text-xs sm:text-sm uppercase text-slate-400 font-bold tracking-widest">
                        Issue Id
                    </Paragraph>
                    <Paragraph className="text-xs sm:text-sm uppercase text-slate-500 font-bold tracking-widest">
                        {issue._id}
                    </Paragraph>
                </div>
            </div>
            <Paragraph className="text-xs sm:text-sm uppercase text-accent/90 font-bold tracking-widest">
                Created By {issue.user.name}
            </Paragraph>
            {!issue.solved && <ErrorWithRedirect errors={errors} loading={loading} />}
            {!issue.solved && issue.user._id === userInfo._id && (
                <Button className="bg-accent text-black py-3 px-6 items-center justify-center flex" onClick={solve}>
                    {loading ? (
                        <LoadingBox className="!text-black" />
                    ) : (
                        <Paragraph className="font-bold tracking-widest">Mark As Solved</Paragraph>
                    )}
                </Button>
            )}
        </div>
    );
};

export default IssueCard;
