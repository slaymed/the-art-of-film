import React, { FC, ComponentProps, useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { useDispatch } from "../hooks/useDispatch";

import { fetchAdvertisement } from "../store/advertisements/thunk";
import { advertisementsSelector } from "../store/advertisements/selectors";

import PageLayout from "../layout/PageLayout";
import H1 from "../components/elements/H1";
import MessageBox from "../components/kits/MessageBox";
import TextHeader from "../components/elements/TextHeader";
import { Link } from "react-router-dom";
import Page from "../components/pages/Page";

export interface AdvertiseListScreenProps extends ComponentProps<"div"> {}

const AdvertiseListScreen: FC<AdvertiseListScreenProps> = ({ className = "", ...rest }) => {
    const advertisements = useSelector(advertisementsSelector);

    const [active] = useState(true);

    const advertisementsFilter = useMemo(() => {
        if (advertisements.length > 0) return advertisements.filter((ad) => ad.active === active);
        return [];
    }, [active, advertisements]);

    return (
        <PageLayout>
            <Page {...rest} className={classNames("", { [className]: className, "gap-16": advertisements.length > 0 })}>
                <H1 className="text-4xl sm:text-6xl">
                    <span className="text-accent">Advertise</span> List
                </H1>
                {advertisements.length > 0 ? (
                    <table className="w-fit">
                        <colgroup>
                            <col />
                            <col />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th className="text-start text-2xl font-medium pr-4">Image</th>
                                <th className="text-start text-2xl font-medium pr-4">Title</th>
                                <th className="text-start text-2xl font-medium">Link</th>
                            </tr>
                        </thead>
                        <tbody>
                            {advertisementsFilter.map((advertisement) => (
                                <tr key={advertisement._id}>
                                    <td className="pr-4">
                                        <Link to={`/advertisement/${advertisement._id}`}>
                                            <div className="flex w-20 sm:w-40 h-14 sm:h-28 my-2">
                                                <img
                                                    src={`${advertisement.image}`}
                                                    alt="advertisement"
                                                    className="max-h-full object-contain max-w-full"
                                                    onClick={() => console.log(advertisement._id)}
                                                />
                                            </div>
                                        </Link>
                                    </td>
                                    <td className="pr-4">
                                        <TextHeader className="line-clamp-3 break-all">
                                            {advertisement.title}
                                        </TextHeader>
                                    </td>
                                    <td className="text-accent">
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
            </Page>
        </PageLayout>
    );
};

export default AdvertiseListScreen;
