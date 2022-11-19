import React, { FC, ComponentProps, useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { fetchAdvertisment } from "../store/advertisments/thunk";
import { advertismentsSelector } from "../store/advertisments/selectors";

import PageLayout from "../layout/PageLayout";
import H1 from "../components/elements/H1";
import MessageBox from "../components/kits/MessageBox";
import TextHeader from "../components/elements/TextHeader";

export interface AdvertiseListScreenProps extends ComponentProps<"div"> {}

const AdvertiseListScreen: FC<AdvertiseListScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const advertisments = useSelector(advertismentsSelector);

    const [active] = useState(true);

    const advertismentsFilter = useMemo(() => {
        if (advertisments.length > 0) return advertisments.filter((ad) => ad.active === active);
        return [];
    }, [active, advertisments]);

    useEffect(() => {
        dispatch(fetchAdvertisment());
    }, [dispatch]);

    return (
        <PageLayout>
            <div
                {...rest}
                className={classNames("p-8 md:p-16 flex flex-col space-y-8", {
                    [className]: className,
                    "space-y-16": advertisments.length > 0,
                })}
            >
                <H1 className="text-4xl sm:text-6xl">
                    <span className="text-accent">Advertise</span> List
                </H1>
                {advertisments.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-l-2 border-accent">
                                <th className="text-start text-2xl font-medium px-4">Title</th>
                                <th className="text-start text-2xl font-medium px-4">Image</th>
                                <th className="text-start text-2xl font-medium px-4">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advertismentsFilter.map((advertisement) => (
                                <tr key={advertisement._id} className="border-accent border-l-2">
                                    <td className="px-4">
                                        <div className="flex w-40 h-28">
                                            <img
                                                src={`${advertisement.image}`}
                                                alt="advertisment"
                                                className="max-h-full object-contain max-w-full"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-4">
                                        <TextHeader className="line-clamp-3 break-all">
                                            {advertisement.title}
                                        </TextHeader>
                                    </td>
                                    <td className="px-4 text-accent">
                                        <a href={advertisement.link}>
                                            <TextHeader className="line-clamp-3 break-all">
                                                {advertisement.link}
                                            </TextHeader>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <MessageBox>No Advertisement</MessageBox>
                )}
            </div>
        </PageLayout>
    );
};

export default AdvertiseListScreen;
