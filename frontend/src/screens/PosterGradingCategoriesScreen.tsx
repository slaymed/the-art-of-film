import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import H1 from "../components/elements/H1";
import Paragraph from "../components/elements/Paragraph";
import TextHeader from "../components/elements/TextHeader";

const data = [
    {
        title: "MINT",
        text: "A totally unused, un-displayed poster with pristine edges, no handling marks, fingerprints etc. This category should be rarely used unless it is immaculate in every way.",
    },
    {
        title: "NEAR MINT",
        text: "This poster should be virtually unused with only the slightest flaws visible – maybe tiny amounts of edge ware, some handling marks etc.",
    },
    {
        title: "VERY GOOD",
        text: "An average used / displayed poster with edge scuffing, pinholes, light wear, some dings etc – will still display well.",
    },
    {
        title: "VERY FINE",
        text: "Slight signs of use but not major wear and tear. Single corner pinholes, minor dings and edge wear would fall under here.",
    },
    {
        title: "GOOD",
        text: "Used with tears, significant pinholes, fold separation, tape or tape burns on the front, marking on image, pen marks showing through from back etc. Poster could use some TLC or restoration.",
    },
    {
        title: "POOR",
        text: "Poster is badly torn, missing paper, image is very faded, handwriting on significant part of poster, not worth displaying – would need major restoration.",
    },
];

export interface PosterGradingCategoriesScreenProps extends ComponentProps<"div"> {}

const PosterGradingCategoriesScreen: FC<PosterGradingCategoriesScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("flex items-center bg-light-dark flex-col p-8 sm:p-16 space-y-8", {
                [className]: className,
            })}
        >
            <H1 className="text-4xl sm:text-6xl text-center text-accent">Poster Grading</H1>

            <Paragraph className="text-sm text-center">
                Collectors using The Art of Film must ensure all posters are grading using this 6 point poster grading
                system.
            </Paragraph>

            <div className="grid grid-cols-1 pt-8 sm:grid-cols-2 lg:grid-cols-3 container gap-8">
                {data.map(({ text, title }) => (
                    <div className="p-8 flex flex-col space-y-8 bg-dark-card">
                        <TextHeader className="text-3xl text-accent">{title}</TextHeader>
                        <Paragraph className="text-sm text-white tracking-wider">{text}</Paragraph>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PosterGradingCategoriesScreen;
