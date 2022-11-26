import React, { FC, ComponentProps, useState, memo, useMemo, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Tab } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";

import { fetchingOrders, ordersList } from "../store/orders/selectors";
import { user } from "../store/auth/selectors";

import Paragraph from "../components/elements/Paragraph";
import MessageBox from "../components/kits/MessageBox";
import H1 from "../components/elements/H1";
import LoadingBox from "../components/kits/LoadingBox";
import OrderInfoCard from "../components/cards/OrderInfoCard";

import { usp_prev } from "../helpers/get-url-search-stream-previous-values";

export interface OrdersScreenProps extends ComponentProps<"div"> {}

export enum SelectedList {
    C_O = "clients-orders",
    M_O = "my-orders",
}

export enum Filters {
    P = "paid",
    U_P = "unpaid",
    R = "recieved",
    D_N_R = "delivered-and-not-recieved",
    P_N_D = "paid-and-not-delivered",
    NULL = "null",
}

const OrdersScreen: FC<OrdersScreenProps> = ({ className = "", ...rest }) => {
    const [usp, setUsp] = useSearchParams();
    const orders = useSelector(ordersList);
    const userInfo = useSelector(user);
    const { loading } = useSelector(fetchingOrders);

    const pannel = (usp.get("pannel") || SelectedList.C_O) as SelectedList;
    const filters = (usp.get("filters") || Filters.NULL) as Filters;

    const [sl, setSl] = useState<SelectedList>(pannel);
    const [filter, setFilter] = useState<Filters>(filters);

    const list = useMemo(() => {
        if (!orders || orders.length === 0 || !userInfo) return [];
        if (sl === SelectedList.M_O) return orders.filter((o) => o.user._id === userInfo._id);
        if (sl === SelectedList.C_O) return orders.filter((o) => o.seller._id === userInfo._id);
        return orders;
    }, [sl, orders, userInfo]);

    const finalList = useMemo(() => {
        switch (filter) {
            case Filters.P:
                return list.filter((o) => o.isPaid);
            case Filters.U_P:
                return list.filter((o) => !o.isPaid);
            case Filters.D_N_R:
                return list.filter((o) => o.isDelivered && !o.isRecieved);
            case Filters.P_N_D:
                return list.filter((o) => o.isPaid && !o.isDelivered);
            case Filters.R:
                return list.filter((o) => o.isRecieved);
            default:
                return list;
        }
    }, [filter, list]);

    const updateFilter = (newFilter: Filters) => {
        if (newFilter === filter) newFilter = Filters.NULL;
        setUsp((prev) => ({ ...usp_prev(prev), filters: newFilter as any }));
    };

    const updatePannel = (pannel: SelectedList) => {
        setUsp((prev) => ({ ...usp_prev(prev), pannel }));
    };

    useEffect(() => {
        setSl(pannel);
    }, [pannel]);

    useEffect(() => {
        setFilter(filters);
    }, [filters]);

    if (!userInfo) return null;

    if (loading)
        return (
            <div className="flex justify-center p-16">
                <LoadingBox />
            </div>
        );

    return (
        <div {...rest} className={classNames("p-8 bg-light-dark flex flex-col space-y-8", { [className]: className })}>
            <H1 className="text-5xl">Orders Screen</H1>
            <div className="flex flex-col items-start w-full space-y-4 lg:space-y-0 lg:justify-between lg:items-center lg:flex-row">
                <Tab.Group>
                    <Tab.List className="flex w-full space-x-4 text-xs lg:w-fit">
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                {
                                    "bg-accent/30 text-accent": sl === SelectedList.C_O,
                                }
                            )}
                            onClick={() => updatePannel(SelectedList.C_O)}
                        >
                            <Paragraph>Clients Orders</Paragraph>
                        </Tab>
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                {
                                    "bg-accent/30 text-accent": sl === SelectedList.M_O,
                                }
                            )}
                            onClick={() => updatePannel(SelectedList.M_O)}
                        >
                            <Paragraph>My Orders</Paragraph>
                        </Tab>
                    </Tab.List>
                </Tab.Group>

                <Tab.Group>
                    <Tab.List className="flex flex-col w-full gap-4 text-xs lg:flex-row lg:w-fit">
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                { "bg-accent/30 text-accent": filter === Filters.P }
                            )}
                            onClick={() => updateFilter(Filters.P)}
                        >
                            <Paragraph className="line-clamp-1">Paid</Paragraph>
                        </Tab>
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                { "bg-accent/30 text-accent": filter === Filters.U_P }
                            )}
                            onClick={() => updateFilter(Filters.U_P)}
                        >
                            <Paragraph className="line-clamp-1">Not Paid</Paragraph>
                        </Tab>
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                { "bg-accent/30 text-accent": filter === Filters.P_N_D }
                            )}
                            onClick={() => updateFilter(Filters.P_N_D)}
                        >
                            <Paragraph className="line-clamp-1">Paid And Not Delivered</Paragraph>
                        </Tab>
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                { "bg-accent/30 text-accent": filter === Filters.D_N_R }
                            )}
                            onClick={() => updateFilter(Filters.D_N_R)}
                        >
                            <Paragraph className="line-clamp-1">Delivery In Progress</Paragraph>
                        </Tab>
                        <Tab
                            className={classNames(
                                "w-full lg:w-fit py-1.5 px-3 sm:py-2 sm:px-6 rounded duration-100 border border-accent/60",
                                { "bg-accent/30 text-accent": filter === Filters.R }
                            )}
                            onClick={() => updateFilter(Filters.R)}
                        >
                            <Paragraph className="line-clamp-1">Recieved</Paragraph>
                        </Tab>
                    </Tab.List>
                </Tab.Group>
            </div>

            {finalList.length > 0 ? (
                <div className="flex max-w-full p-4 space-x-6 overflow-x-auto w-fit bg-dark-card scroll-bar">
                    {finalList.map((order) => (
                        <OrderInfoCard
                            key={order._id}
                            order={order}
                            user={userInfo}
                            flexColOnly
                            redirect
                            showActions={false}
                        />
                    ))}
                </div>
            ) : (
                <MessageBox className="text-center">No Order to Show</MessageBox>
            )}
        </div>
    );
};

export default memo(OrdersScreen);
