import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import ShowcaseCard from "../components/cards/ShowcaseCard";
import SectionCard from "../components/cards/SectionCard";
import GrahamGalleryPage from "../components/pages/GrahamGalleryPage";

export interface GrahamHumpreysProps extends ComponentProps<"div"> {}

const GrahamHumpreys: FC<GrahamHumpreysProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <div className="mx-auto container flex flex-col space-y-8">
                <ShowcaseCard
                    before="GRAHAM"
                    title="HUMPHREYS"
                    text="Film poster illustrator Graham Humphreys is a highly acclaimed and talented artist and graphics illustrator. We are proud to announce that we have recently interviewed Graham about his movie poster designs and lifetime achievements."
                    image="/images/Graham-Humphreys.jpg"
                />
                <ShowcaseCard
                    reverse
                    before="GRAHAM"
                    title="H. WORK"
                    text="Graham designed the artwork for the UK releases of The Evil Dead and the Evil Dead II as well as all the British posters for The Nightmare on Elm Street series and other posters for cinema release, video, VHS and DVD & Bluray covers."
                    image="/images/Graham-H-work.jpg"
                />
            </div>

            <div className="bg-light-dark p-8 flex items-center justify-center">
                <div className="container">
                    <SectionCard
                        before="The Graham Humphreys"
                        title="Interview"
                        text="Intro test for You Tube Video in the blog Renowned graphics designer and film poster artist Graham Humphreys talks to The Art of Film about his incredible horror artwork including A Nightmare on Elm Street and The Evil Dead and much more."
                        linkText="SUBSCRIBE Today"
                        link="https://www.youtube.com/watch?v=F4LAB1YLytQ&feature=youtu.be&ab_channel=TheArtofFilm"
                        youtubeLink="https://www.youtube.com/embed/F4LAB1YLytQ"
                        type="video"
                    />
                </div>
            </div>

            <GrahamGalleryPage />
        </div>
    );
};

export default GrahamHumpreys;
