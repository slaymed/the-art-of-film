import React, { FC, ComponentProps, useState, useMemo, useCallback } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Paragraph from "../components/elements/Paragraph";
import LoadingBox from "../components/kits/LoadingBox";
import ErrorWithRedirect from "../components/kits/ErrorWithRedirect";
import CurrencyConvert from "../components/kits/CurrencyConvert";
import Paginator from "../components/kits/Paginator";
import RefetchButton from "../components/kits/RefetchButton";
import Button from "../components/elements/Button";
import H1 from "../components/elements/H1";
import PageLayout from "../layout/PageLayout";
import AlphbetNumericFilter from "../components/kits/AlphbetNumericFilter";

import { useDispatch } from "../hooks/useDispatch";

import { deletePoster, fetchMyProducts } from "../store/products/thunks";
import { fetchingMyProducts, myProductsSelector } from "../store/products/selectors";

export interface PostersListScreenProps extends ComponentProps<"div"> {}

const PostersListScreen: FC<PostersListScreenProps> = ({ className = "", ...rest }) => {
    const dispatch = useDispatch();

    const myPosters = useSelector(myProductsSelector);
    const fetching = useSelector(fetchingMyProducts);

    const [filter, setFilter] = useState("All");
    const [show] = useState(6);
    const [page, setPage] = useState(1);

    const updateFilter = (filter: string = "All") => {
        setFilter(filter);
        setPage(1);
    };

    const filteredList = useMemo(() => {
        setPage(1);
        if (!filter || filter === "All") return myPosters;
        if (filter === "0..9") return myPosters.filter(({ name }) => /\d/.test(name));
        return myPosters.filter(({ name }) => name.toLowerCase().startsWith(filter.toLowerCase()));
    }, [filter, myPosters]);

    const paginatedList = useMemo(() => {
        return filteredList.slice((page - 1) * show, page * show);
    }, [show, page, filteredList]);

    const refetch = useCallback(() => dispatch(fetchMyProducts()), [dispatch]);

    return (
        <PageLayout>
            <div
                {...rest}
                className={classNames("bg-light-dark p-8 sm:p-16 flex flex-col space-y-8", { [className]: className })}
            >
                <div className="flex justify-between items-center space-x-4">
                    <H1 className="text-xl sm:text-4xl tracking-widest text-accent uppercase">My Posters</H1>
                    <div className="flex items-center space-x-4">
                        <RefetchButton onClick={refetch} />
                        <Link to="/posters/create">
                            <Paragraph className="text-xs sm:text-lg text-accent underline underline-offset-2">
                                New Poster
                            </Paragraph>
                        </Link>
                    </div>
                </div>

                <AlphbetNumericFilter filter={filter} updateFilter={updateFilter} />

                {fetching.loading && <LoadingBox />}
                <ErrorWithRedirect {...fetching} />

                {myPosters.length === 0 && !fetching.loading && (
                    <Paragraph className="text-xs sm:text-lg text-red-600">No Poster to show</Paragraph>
                )}

                {paginatedList.length > 0 && (
                    <table>
                        <colgroup>
                            <col />
                            <col />
                            <col />
                            <col className="hidden sm:table-column" />
                            <col className="hidden sm:table-column" />
                            <col />
                        </colgroup>
                        <thead>
                            <tr>
                                <th>
                                    <Paragraph className="break-keep text-start line-clamp-1 font-normal text-slate-300">
                                        Image
                                    </Paragraph>
                                </th>
                                <th>
                                    <Paragraph className="whitespace-nowrap w-full text-start line-clamp-1 font-normal text-slate-300">
                                        Name
                                    </Paragraph>
                                </th>
                                <th>
                                    <Paragraph className="whitespace-nowrap w-full text-start line-clamp-1 font-normal text-slate-300">
                                        Price
                                    </Paragraph>
                                </th>
                                <th className="hidden sm:table-cell">
                                    <Paragraph className="whitespace-nowrap w-full text-start line-clamp-1 font-normal text-slate-300">
                                        Visiblity
                                    </Paragraph>
                                </th>
                                <th className="hidden sm:table-cell">
                                    <Paragraph className="whitespace-nowrap w-full text-start line-clamp-1 font-normal text-slate-300">
                                        For Sale
                                    </Paragraph>
                                </th>
                                <th>
                                    <Paragraph className="whitespace-nowrap w-full text-start line-clamp-1 font-normal text-slate-300">
                                        Actions
                                    </Paragraph>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedList.map((poster) => (
                                <tr key={poster._id}>
                                    <td>
                                        <div className="py-4 pr-2">
                                            <div className="w-20 h-14 sm:w-28 sm:h-20">
                                                <img
                                                    src={poster.image}
                                                    alt="Poster"
                                                    className="w-full h-full bg-cover"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to={`/poster/${poster._id}`}>
                                            <Paragraph className="text-accent pr-2 underline underline-offset-2 line-clamp-1">
                                                {poster.name}
                                            </Paragraph>
                                        </Link>
                                    </td>
                                    <td>
                                        <Paragraph className="text-sm pr-2 text-slate-400">
                                            <CurrencyConvert amount={poster.salePrice || poster.price} />
                                        </Paragraph>
                                    </td>
                                    <td className="hidden sm:table-cell">
                                        <span>
                                            <i
                                                className={classNames("text-lg text-slate-500 fa-solid", {
                                                    "fa-check": poster.visible,
                                                    "fa-close": !poster.visible,
                                                })}
                                            />
                                        </span>
                                    </td>
                                    <td className="hidden sm:table-cell">
                                        <span>
                                            <i
                                                className={classNames("text-lg text-slate-500 fa-solid", {
                                                    "fa-check": poster.forSale,
                                                    "fa-close": !poster.forSale,
                                                })}
                                            />
                                        </span>
                                    </td>
                                    <td>
                                        <div className="flex gap-6 items-center flex-shrink-0">
                                            <Link to={`/posters/${poster._id}/edit`}>
                                                <span>
                                                    <i className="text-lg text-accent/60 fa-solid fa-edit" />
                                                </span>
                                            </Link>
                                            <Button onClick={() => dispatch(deletePoster(poster._id))} type="button">
                                                <span>
                                                    <i className="text-lg text-red-600/60 fa-solid fa-trash" />
                                                </span>
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <Paginator
                    count={filteredList.length}
                    onPagination={(page: number): any => setPage(page)}
                    page={page}
                    show={show}
                />
            </div>
        </PageLayout>
    );
};

export default PostersListScreen;
