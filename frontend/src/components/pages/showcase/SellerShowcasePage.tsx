import React, { FC, ComponentProps, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import { IShowcase } from "../../../store/showcase/types";
import { User } from "../../../store/auth/types";
import { selectedShowcaseProduct } from "../../../store/showcase/selectors";

import Paragraph from "../../elements/Paragraph";
import ProductPage from "../products/ProductPage";
import ShowcaseProducts from "./ShowcaseProducts";

export interface SellerShowcasePageProps extends ComponentProps<"div"> {
    showcase: IShowcase;
    user: User;
}

const SellerShowcasePage: FC<SellerShowcasePageProps> = ({ className = "", showcase, user, ...rest }) => {
    const product = useSelector(selectedShowcaseProduct);

    return (
        <div {...rest} className={classNames("w-full flex flex-col gap-8 sm:gap-16", { [className]: className })}>
            <Paragraph className="text-6xl px-8 sm:px-16 text-center font-bold line-clamp-2 hover:line-clamp-none tracking-widest text-accent uppercase">
                {showcase.seller.name}
            </Paragraph>

            <ShowcaseProducts showcase={showcase} user={user} />

            {product && <ProductPage product={product} reverse className="px-8 sm:px-16 pb-8 sm:pb-16" />}
        </div>
    );
};

export default SellerShowcasePage;
