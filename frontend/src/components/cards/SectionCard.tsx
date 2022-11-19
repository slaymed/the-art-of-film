import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import TextHeader from "../elements/TextHeader";
import Paragraph from "../elements/Paragraph";

export interface SectionCardProps extends ComponentProps<"div"> {
    before: string;
    title: string;
    text: string;
    image?: string;
    linkText: string;
    link: string;
    type: string;
    youtubeLink?: string;
    imageClasses?: string;
}

const SectionCard: FC<SectionCardProps> = ({
    className = "",
    before,
    title,
    text,
    image,
    linkText,
    link,
    type,
    youtubeLink,
    imageClasses = "",
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames("mx-auto w-full p-12 sm:px-24 sm:py-16 md:px-24 md:py-16 lg:px-24 xl:px-32", {
                [className]: className,
            })}
        >
            <div
                className={classNames(
                    "flex lg:justify-between flex-col space-y-16 lg:flex-row lg:space-y-0 lg:space-x-16 mx-auto"
                )}
            >
                <div className="flex-col flex justify-between space-y-8 lg:w-2/5">
                    <div className="flex flex-col space-y-2">
                        <TextHeader className="text-5xl sm:text-6xl lg:text-5xl xl:text-6xl">
                            <span className="text-accent">{before}</span> {title}
                        </TextHeader>
                        <Paragraph className="pr-8 line-clamp-6 hover:line-clamp-none">{text}</Paragraph>
                    </div>
                    <a
                        href={link}
                        target="_blank"
                        className={classNames("px-12 py-4 w-fit tracking-wider text-black bg-accent", {
                            "bg-red-600 !text-white": type !== "image",
                        })}
                        rel="noreferrer"
                    >
                        {linkText}
                    </a>
                </div>
                <div className="lg:w-3/5">
                    {type === "image" ? (
                        <img src={image} alt="" className={imageClasses} />
                    ) : (
                        <iframe
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="The Art of Film - Coming Soon"
                            className="aspect-video w-full"
                            src={
                                youtubeLink
                                    ? youtubeLink
                                    : "https://www.youtube.com/embed/ofkryTjra7Q?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Ftheartoffilms.kinsta.cloud&amp;widgetid=1"
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionCard;
