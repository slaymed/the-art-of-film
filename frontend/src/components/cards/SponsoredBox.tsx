import React, { FC, ComponentProps, memo } from "react";
import classNames from "classnames";

import { Advertisement } from "../../store/advertisements/types";

export interface AdsCardProps extends ComponentProps<"div"> {
    advertisement: Advertisement;
    sizeClasses?: string;
}

const AdsCard: FC<AdsCardProps> = ({
    className = "",
    advertisement,
    sizeClasses = "w-[280px] xs:w-[360px] h-[280px] xs:h-[360px]",
    ...rest
}) => {
    if (!advertisement) return null;

    return (
        <div {...rest} className={classNames("flex flex-col gap-8 group", { [className]: className })}>
            <div className="flex w-fit flex-col gap-2">
                <span className="text-lg text-accent tracking-widest">Sponsored Link</span>
                <div className="w-1/3 bg-accent group-hover:w-full duration-200 rounded-full h-[2px]" />
            </div>
            <a href={advertisement.link} rel="noreferrer" target="_blank">
                <div
                    className="w-fit mx-auto bg-cover border border-slate-700"
                    style={{ backgroundImage: `url(${advertisement.image})` }}
                >
                    <div className="w-full h-full backdrop-blur-md bg-black/70">
                        <div className={classNames({ [sizeClasses]: sizeClasses })}>
                            <img
                                src={advertisement.image}
                                alt="Sponsored Link"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default memo(AdsCard);
