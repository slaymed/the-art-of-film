import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import SearchBox from "../SearchBox";
import H1 from "../elements/H1";
import TextHeader from "../elements/TextHeader";

export interface HeroSectionProps extends ComponentProps<"div"> {
    heading?: string;
    heading2?: string;
    image?: string;
    showSearch?: boolean;
}

const HeroSection: FC<HeroSectionProps> = ({
    className = "",
    heading = "The Art Of Film",
    heading2 = "A MOVIE POSTER COLLECTOR’S INDISPENSABLE TOOLKIT",
    image = "",
    showSearch = false,
    style = {},
    ...rest
}) => {
    return (
        <div
            {...rest}
            className={classNames("relative h-[556px]", { [className]: className })}
            style={{
                ...style,
                backgroundImage: `url(${image})`,
            }}
        >
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                <div className="flex flex-col space-y-10">
                    <H1 className="text-accent text-5xl sm:text-7xl text-center">{heading}</H1>

                    <TextHeader className="text-2xl sm:text-3xl text-center">{heading2}</TextHeader>

                    {showSearch && <SearchBox />}
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
