import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { Advertisement } from "../../../store/advertisements/types";
import Paragraph from "../../elements/Paragraph";
import TextHeader from "../../elements/TextHeader";

export interface SponsoredLinkPageProps extends ComponentProps<"div"> {
    advertisement: Advertisement;
    showTitle?: boolean;
}

const SponsoredLinkPage: FC<SponsoredLinkPageProps> = ({
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

            <div className="flex flex-col md:flex-row md:justify-between gap-8">
                <div className="flex flex-col w-full md:w-2/3">
                    <div className="w-full">
                        <a href={advertisement.link} target="_blank">
                            <img
                                src={advertisement.image}
                                alt="Sponsored Link"
                                className="w-full border-2 border-accent object-contain"
                            />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col w-full md:w-1/3 gap-8">
                    <a
                        href={advertisement.link}
                        target="_blank"
                        className="text-accent underline uppercase tracking-widest underline-offset-2 text-lg"
                    >
                        {advertisement.link}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SponsoredLinkPage;
