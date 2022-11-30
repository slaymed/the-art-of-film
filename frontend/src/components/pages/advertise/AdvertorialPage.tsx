import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import { Advertisement } from "../../../store/advertisements/types";

import Paragraph from "../../elements/Paragraph";
import TextHeader from "../../elements/TextHeader";

export interface AdvertorialPageProps extends ComponentProps<"div"> {
    advertisement: Advertisement;
    showTitle?: boolean;
}

const AdvertorialPage: FC<AdvertorialPageProps> = ({ className = "", advertisement, showTitle = true, ...rest }) => {
    if (!advertisement) return null;

    return (
        <div {...rest} className={classNames("flex flex-col gap-8", { [className]: className })}>
            {showTitle && (
                <TextHeader className="text-3xl text-accent tracking-widest line-clamp-3 capitalize">
                    {advertisement.title}
                </TextHeader>
            )}

            <div className="flex flex-col lg:flex-row lg:justify-between gap-8">
                <div className="flex flex-col w-full lg:w-2/3">
                    <div className="flex flex-col gap-8">
                        <div className="w-full">
                            <img
                                src={advertisement.image}
                                alt="Advertorail Banner"
                                className="w-full border-2 border-accent object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-8">
                            {advertisement.paragraphs.map((text, index) => (
                                <Paragraph key={index} className="text-slate-400 tracking-wider leading-7">
                                    {text}
                                </Paragraph>
                            ))}
                        </div>
                        <a
                            href={advertisement.link}
                            rel="noreferrer"
                            target="_blank"
                            className="text-accent underline uppercase tracking-widest underline-offset-2 text-lg"
                        >
                            {advertisement.link}
                        </a>
                    </div>
                </div>
                <div className="flex flex-col lg:w-1/3 gap-8">
                    {advertisement.images.map((image) => (
                        <img
                            src={image}
                            key={image}
                            alt="Advertisement"
                            className="max-h-[600px] object-contain ml-auto w-full border-2 border-accent"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdvertorialPage;
