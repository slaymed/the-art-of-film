import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { Advertisement } from "../../../store/advertisements/types";
import TextHeader from "../../elements/TextHeader";

export interface AdvertisementBannerPageProps extends ComponentProps<"div"> {
    advertisement: Advertisement;
    showTitle?: boolean;
}

const AdvertisementBannerPage: FC<AdvertisementBannerPageProps> = ({
    className = "",
    advertisement,
    showTitle = true,
    ...rest
}) => {
    if (!advertisement) return null;

    return (
        <div {...rest} className={classNames("flex flex-col gap-8", { [className]: className })}>
            {showTitle && (
                <TextHeader className="text-3xl text-accent tracking-widest line-clamp-3 capitalize">
                    {advertisement.title}
                </TextHeader>
            )}

            <div className="w-full">
                <a href={advertisement.link} target="_blank" rel="noreferrer">
                    <img
                        src={advertisement.image}
                        alt="Sponsored Link"
                        className="w-full border-2 border-accent object-contain"
                    />
                </a>
            </div>

            <a
                href={advertisement.link}
                target="_blank"
                rel="noreferrer"
                className="text-accent underline uppercase tracking-widest underline-offset-2 text-lg"
            >
                {advertisement.link}
            </a>
        </div>
    );
};

export default AdvertisementBannerPage;
