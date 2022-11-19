import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import HeroSection from "../components/sections/HeroSection";
import H1 from "../components/elements/H1";
import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";

// TODO: Redesigned using tailwind: Remove Comment When Pushing to production

export interface AboutScreenProps extends ComponentProps<"div"> {}

const AboutScreen: FC<AboutScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <HeroSection heading="About Us" heading2="" image="/images/About-Us.png" />

            <div className="p-16">
                <div className="w-fit flex flex-col mx-auto items-center space-y-8">
                    <H1 className="text-4xl sm:text-6xl">
                        ADVERTISE WITH <span className="text-accent">THE ART OF FILM</span>
                    </H1>

                    <Paragraph className="text-sm md:text-md max-w-[780px]">
                        You do not have to subscribe in order to advertise with The Art of Film. If you have any
                        questions about our advertising options please
                        <Link to="/contact-us" className="text-accent">
                            {" "}
                            Contact Us
                        </Link>
                    </Paragraph>
                </div>
            </div>

            <div className="p-8 sm:p-12 bg-light-dark">
                <div className="w-11/12 flex flex-col space-y-32 mx-auto">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="w-full">
                            <div className="flex flex-col space-y-8">
                                <TextHeader className="text-4xl sm:text-6xl">
                                    <span className="text-accent">Showcase</span> YOUR MOVIE POSTERS
                                </TextHeader>
                                <div className="flex flex-col space-y-4 line-clamp-6 2xl:line-clamp-none hover:line-clamp-none">
                                    <Paragraph>
                                        In The Art of Film showcase you can collate, edit and view your entire movie
                                        poster collection in one place, as well as share a single poster image or your
                                        whole collection with 1 person or all the members in the world.
                                    </Paragraph>
                                    <Paragraph>
                                        Once you have subscribed to The Art of Film you will upload and manage a minimum
                                        of 500 posters with dropdown menus to populate with your own collection
                                        information.
                                    </Paragraph>
                                    <Paragraph>
                                        When uploading your poster images to the showcase you select the format, country
                                        of issue, condition, year of release, cast and crew, etc.
                                    </Paragraph>
                                    <Paragraph>
                                        Contact Henry Coleman the author
                                        <a className="text-accent" href="mailto:admin@theartoffilm.co.uk">
                                            {" "}
                                            admin@theartoffilm.co.uk
                                        </a>
                                    </Paragraph>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <img src="/images/poster-1.jpg" alt="" className={classNames("w-full")} />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="w-full">
                            <div className="flex flex-col space-y-8">
                                <TextHeader className="text-4xl sm:text-6xl">
                                    <span className="text-accent">Showcase</span> YOUR MOVIE POSTERS
                                </TextHeader>
                                <div className="flex flex-col space-y-4 line-clamp-6 2xl:line-clamp-none hover:line-clamp-none">
                                    <Paragraph>
                                        In The Art of Film showcase you can collate, edit and view your entire movie
                                        poster collection in one place, as well as share a single poster image or your
                                        whole collection with 1 person or all the members in the world.
                                    </Paragraph>
                                    <Paragraph>
                                        Once you have subscribed to The Art of Film you will upload and manage a minimum
                                        of 500 posters with dropdown menus to populate with your own collection
                                        information.
                                    </Paragraph>
                                    <Paragraph>
                                        When uploading your poster images to the showcase you select the format, country
                                        of issue, condition, year of release, cast and crew, etc.
                                    </Paragraph>
                                    <Paragraph>
                                        Contact Henry Coleman the author
                                        <a className="text-accent" href="mailto:admin@theartoffilm.co.uk">
                                            {" "}
                                            admin@theartoffilm.co.uk
                                        </a>
                                    </Paragraph>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <img src="/images/news-paper.png" alt="" className={classNames("w-full")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;
