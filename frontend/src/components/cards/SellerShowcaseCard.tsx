import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { User } from "../../store/auth/types";
import data from "../../data";

export interface SellerShowcaseCardProps extends ComponentProps<"div"> {
    seller: User;
}

const SellerShowcaseCard: FC<SellerShowcaseCardProps> = ({ className = "", seller, ...rest }) => {
    return (
        <div {...rest} className={classNames("bg-base p-4 w-full max-w-[300px]", { [className]: className })}>
            <ul className="bg-light-dark flex space-y-8 flex-col p-8 w-full items-center">
                <li>
                    <Link
                        className="text-2xl tracking-widest line-clamp-1 text-center text-accent"
                        to={`/seller/${seller._id}`}
                    >
                        {seller.name}
                    </Link>
                </li>

                <li className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-0.4">
                            <span style={{ fontSize: "2.5rem" }}>
                                <img
                                    width={32}
                                    src={
                                        seller.code
                                            ? `https://flagcdn.com/${seller.code.toLowerCase()}.svg`
                                            : "https://upload.wikimedia.org/wikipedia/commons/b/b0/No_flag.svg"
                                    }
                                    alt={seller.name}
                                />
                            </span>
                            <span className="ml-2">
                                {
                                    data.stripe_origins.find((stripe_origin) => stripe_origin.code === seller.country)
                                        ?.name
                                }
                            </span>
                        </div>
                        <Link className="text-lg text-accent" to={`/seller/${seller._id}`}>
                            <i className="fas fa-arrow-right" />
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default SellerShowcaseCard;
