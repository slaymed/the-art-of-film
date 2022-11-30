import React, { FC, ComponentProps, useEffect } from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Paragraph from "../components/elements/Paragraph";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import LoadingBox from "../components/kits/LoadingBox";
import IssueCard from "../components/cards/IssueCard";

import { fetchingIssues, issuesList } from "../store/issues/selectors";
import { fetchIssues } from "../store/issues/thunks";

import { useDispatch } from "../hooks/useDispatch";

export interface IssuesScreenProps extends ComponentProps<"div"> {}

const IssuesScreen: FC<IssuesScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const { orderId } = useParams();

    const { loading, errors } = useSelector(fetchingIssues);
    const issues = useSelector(issuesList);

    useEffect(() => {
        if (orderId) dispatch(fetchIssues(orderId));
    }, [orderId, dispatch]);

    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 flex bg-light-dark flex-col space-y-8", { [className]: className })}
        >
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <Paragraph className="text-2xl sm:text-3xl uppercase text-accent font-bold tracking-widest">
                    Order Issues
                </Paragraph>
                <Link to={`/raise-an-issue/${orderId}`}>
                    <Paragraph className="underline select-none cursor-pointer text-accent underline-offset-2 text-sm">
                        Raise New Issue
                    </Paragraph>
                </Link>
            </div>

            <ErrorWithRedirect loading={loading} errors={errors} />
            {loading && <LoadingBox />}

            {issues.map((issue) => (
                <IssueCard key={issue._id} issue={issue} />
            ))}
        </div>
    );
};

export default IssuesScreen;
