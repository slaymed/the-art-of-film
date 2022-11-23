import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import TextHeader from "../elements/TextHeader";
import Paragraph from "../elements/Paragraph";

export interface ShowcaseCardProps extends ComponentProps<"div"> {
    before: string;
    title: string;
    text: string;
    image: string;
    link?: string;
    linkText?: string;
    reverse?: boolean;
    showBorder?: boolean;
    maxImageWidthClasses?: string;
    imageEnd?: boolean;
    cutString?: boolean;
}

const ShowcaseCard: FC<ShowcaseCardProps> = ({
    className = "",
    before,
    title,
    text,
    image,
    link,
    linkText,
    reverse = false,
    showBorder = false,
    maxImageWidthClasses = "",
    imageEnd,
    cutString = true,
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames(
                "flex lg:border-b-0 flex-col lg:justify-between p-12 sm:px-24 sm:py-8 md:px-24 md:py-16 lg:px-24 xl:px-32 gap-y-12 sm:gap-y-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-0 xl:gap-32",
                {
                    [className]: className,
                    "lg:!flex-row-reverse": reverse,
                    "lg:!flex-row": !reverse,
                }
            )}
        >
            <div className="flex flex-col space-y-8 justify-between w-full">
                <div className="flex flex-col space-y-4">
                    <TextHeader className="text-3xl sm:text-5xl xl:text-6xl">
                        <span className="text-accent">{before}</span> {title}
                    </TextHeader>
                    <Paragraph
                        className={classNames("text-md sm:text-lg", {
                            "line-clamp-6 2xl:line-clamp-none hover:line-clamp-none": cutString,
                        })}
                    >
                        {text}
                    </Paragraph>
                </div>
                {link && linkText && (
                    <Link to={link} className="px-12 py-4 tracking-wider w-fit text-black bg-accent">
                        {linkText}
                    </Link>
                )}
            </div>
            <div className="w-full">
                <img
                    src={image}
                    alt="Poster"
                    className={classNames("max-w-full object-contain", {
                        "border-4 border-accent": showBorder,
                        "max-h-[400px] lg:max-h-[500px]": !maxImageWidthClasses,
                        [maxImageWidthClasses]: maxImageWidthClasses,
                        "ml-auto": imageEnd,
                    })}
                />
            </div>
        </div>
    );
};

export default ShowcaseCard;
