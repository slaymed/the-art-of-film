import React, { FC, ComponentProps, useState, memo } from "react";
import classNames from "classnames";
import FilterCard from "../cards/FilterCard";
import { useSelector } from "react-redux";
import { fetchingShopProducts, shopCurrentPage, shopPagesCount, shopTotalCount } from "../../store/shop/selectors";
import { Listbox } from "@headlessui/react";
import { useSearchParams } from "react-router-dom";
import { usp_prev } from "../../helpers/get-url-search-stream-previous-values";
import { useDispatch } from "../../hooks/useDispatch";
import { fetchShopProducts } from "../../store/shop/thunks";

const showPerPageOptions = [{ value: 6 }, { value: 9 }, { value: 12 }];

export interface ShopPaginatorProps extends ComponentProps<"div"> {}

const ShopPaginator: FC<ShopPaginatorProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const [sp] = useSearchParams();

    const totalCount = useSelector(shopTotalCount);
    const pagesCount = useSelector(shopPagesCount);
    const currentPage = useSelector(shopCurrentPage);

    const [show, setShow] = useState(6);

    const fetching = useSelector(fetchingShopProducts);

    const updateShowPerPage = (nextShow: number) => {
        if (nextShow === show) return;
        setShow(nextShow);
        if (nextShow > show && show >= totalCount) return;
        if (nextShow < show && nextShow >= totalCount) return;
        dispatch(fetchShopProducts({ query: usp_prev(sp), itemsPerPage: nextShow, requestedPageNumber: currentPage }));
    };

    const updatePage = (page: number) => {
        if (page === currentPage) return;
        dispatch(fetchShopProducts({ query: usp_prev(sp), itemsPerPage: show, requestedPageNumber: page }));
    };

    if (fetching.loading || totalCount === 0) return null;

    return (
        <div {...rest} className={classNames("flex gap-4 flex-wrap", { [className]: className })}>
            <Listbox value={show} onChange={updateShowPerPage} as="div" className="flex relative flex-col gap-2">
                <Listbox.Button type="button" className="px-4 h-10 border-accent text-black border-2 bg-accent">
                    <div className="flex gap-4 items-center text-lg tracking-widest justify-center">
                        <span>{show} Items Per Page</span>
                        <span>
                            <i className="relative -top-[1px] fa-solid fa-chevron-down" />
                        </span>
                    </div>
                </Listbox.Button>
                <Listbox.Options className="border-2 border-accent bg-light-dark absolute top-12 inset-x-0">
                    {showPerPageOptions.map(({ value }) => (
                        <Listbox.Option key={value} value={value} className="cursor-pointer">
                            <span
                                className={classNames("flex text-lg tracking-widest items-center h-10 px-4", {
                                    "bg-accent text-black": show === value,
                                })}
                            >
                                {value} Items Per Page
                            </span>
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>

            {Array.from(Array(pagesCount || 1).keys()).map((pageNumber) => (
                <FilterCard
                    key={pageNumber}
                    alphabet={(pageNumber + 1).toString()}
                    filter={currentPage.toString()}
                    onClick={() => updatePage(pageNumber + 1)}
                />
            ))}
        </div>
    );
};

export default memo(ShopPaginator);
