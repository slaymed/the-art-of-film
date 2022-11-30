import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Advertisement } from "../../store/advertisements/types";

import Paragraph from "../elements/Paragraph";

export interface AdvertisementCardProps extends ComponentProps<"div"> {
    advertisement: Advertisement;
}

const AdvertisementCard: FC<AdvertisementCardProps> = ({ className = "", advertisement, ...rest }) => {
    if (!advertisement) return null;

    return (
        <Link to={`/advertisement/${advertisement._id}`}>
            <div
                {...rest}
                className={classNames("bg-dark-card border border-slate-700 flex flex-col w-full h-full", {
                    [className]: className,
                })}
            >
                <div
                    className="max-h-[400px] h-full w-full bg-cover"
                    style={{ backgroundImage: `url(${advertisement.image})` }}
                >
                    <div className="w-full h-full backdrop-blur-md bg-black/70">
                        <img src={advertisement.image} alt="Advertisement" className="w-full h-full object-contain" />
                    </div>
                </div>

                <div className="flex flex-col gap-4 p-4">
                    <Paragraph className="line-clamp-1 text-lg text-accent hover:line-clamp-none">
                        {advertisement.title}
                    </Paragraph>
                </div>
            </div>
        </Link>
    );
};

export default memo(AdvertisementCard);
