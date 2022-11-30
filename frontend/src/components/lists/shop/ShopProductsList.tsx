import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { fetchingShopProducts, shopProducts } from "../../../store/shop/selectors";

import Product from "../../Product";
import LoadingBox from "../../kits/LoadingBox";
import ErrorWithRedirect from "../../kits/ErrorWithRedirect";

export interface ShopProductsListProps extends ComponentProps<"div"> {
    listClasses?: string;
}

const ShopProductsList: FC<ShopProductsListProps> = ({ className = "", listClasses = "", ...rest }) => {
    const products = useSelector(shopProducts);
    const fetching = useSelector(fetchingShopProducts);

    return (
        <div {...rest} className={classNames("flex flex-col gap-8", { [className]: className })}>
            {fetching.loading && <LoadingBox className="mx-auto" />}
            <ErrorWithRedirect {...fetching} className="mx-auto" boxClasses="!text-xl" />
            <div className={listClasses}>
                {!fetching.loading &&
                    Array.isArray(products) &&
                    products.map((product) => (
                        <Product key={product._id} maxWidth={null} toShop={false} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default ShopProductsList;
