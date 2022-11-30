import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Advertisement } from "../../store/advertisements/types";

export interface AdvertorialBoxProps extends ComponentProps<"div"> {
    advertisement: Advertisement;
    sizeClasses?: string;
}

const AdvertorialBox: FC<AdvertorialBoxProps> = ({
    className = "",
    advertisement,
    sizeClasses = "w-[280px] xs:w-[360px] h-[280px] xs:h-[360px]",
    ...rest
}) => {
    if (!advertisement) return null;

    const image =
        advertisement.images && advertisement.images.length > 0 ? advertisement.images[0] : advertisement.image;

    return (
        <div {...rest} className={classNames("flex flex-col gap-8 group", { [className]: className })}>
            <div className="flex w-fit flex-col gap-2">
                <span className="text-lg text-orange-500 tracking-widest">Sponsored Advert</span>
                <div className="w-1/3 bg-orange-500 group-hover:w-full duration-200 rounded-full h-[2px]" />
            </div>
            <Link to={`/advertorial/${advertisement._id}`}>
                <div
                    className="w-fit mx-auto bg-cover border border-slate-700"
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <div className="w-full h-full backdrop-blur-md bg-black/70">
                        <div className={classNames({ [sizeClasses]: sizeClasses })}>
                            <img src={image} alt="Sponsored Link" className="w-full h-full object-contain" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AdvertorialBox;
