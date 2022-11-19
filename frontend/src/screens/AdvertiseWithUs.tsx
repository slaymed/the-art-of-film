import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import Paragraph from "../components/elements/Paragraph";
import TextHeader from "../components/elements/TextHeader";
import H1 from "../components/elements/H1";
import HeroSection from "../components/sections/HeroSection";

export interface AdvertiseWithUsProps extends ComponentProps<"div"> {}

const AdvertiseWithUs: FC<AdvertiseWithUsProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <HeroSection heading="Advertise With Us" heading2="HOME / AdvertiseWithUs" image="/images/banner-1.png" />

            <div className="p-16">
                <div className="w-fit flex flex-col mx-auto items-center space-y-8">
                    <H1 className="text-4xl sm:text-6xl">
                        <span className="text-accent">ADVERTISING</span> OPTIONS
                    </H1>

                    <Paragraph className="text-sm md:text-md max-w-[780px] text-center">
                        You do not have to subscribe in order to advertise with The Art of Film. If you have any
                        questions about our advertising options please Contact Henry Coleman the author{" "}
                        <Link to="/contact-us" className="text-accent">
                            admin@theartoffilm.co.uk
                        </Link>
                    </Paragraph>
                </div>
            </div>

            <div className="p-8 sm:p-12 bg-light-dark">
                <div className="w-11/12 flex flex-col space-y-32 mx-auto">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="w-full flex flex-col flex-1 justify-between space-y-8">
                            <div className="flex flex-col space-y-8">
                                <TextHeader className="text-4xl sm:text-6xl">
                                    <span className="text-accent">SPONSORED</span> LINKS
                                </TextHeader>
                                <div className="flex flex-col space-y-4 line-clamp-6 2xl:line-clamp-none hover:line-clamp-none">
                                    <Paragraph>
                                        Sponsored Links are external links embedded in an image that links directly to
                                        your website.
                                    </Paragraph>
                                    <Paragraph>
                                        These links will appear on multiple pages throughout our Site. Each sponsored
                                        link is priced at £25 per month or £250 for a year (2 months free). select your
                                        preference when you ‘Add to Cart’.
                                    </Paragraph>
                                    <Paragraph>
                                        When uploading your poster images to the showcase you select the format, country
                                        of issue, condition, year of release, cast and crew, etc.
                                    </Paragraph>
                                    <Paragraph>
                                        Please Once you have purchased your sponsored link a member of The Art of Film
                                        will be in touch to discuss the requirements and artwork for your advert.
                                        Contact Henry Coleman the author
                                        <a className="text-accent" href="mailto:admin@theartoffilm.co.uk">
                                            {" "}
                                            admin@theartoffilm.co.uk
                                        </a>
                                    </Paragraph>
                                </div>
                            </div>
                            <Link to="/advertise" className="bg-accent w-fit py-2 px-6">
                                <Paragraph>Advertise with us</Paragraph>
                            </Link>
                        </div>

                        <div className="flex-1">
                            <img src="/images/poster-1.jpg" alt="" className={classNames("w-full")} />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="w-full flex flex-col flex-1 justify-between space-y-8">
                            <div className="flex flex-col space-y-8">
                                <TextHeader className="text-4xl sm:text-6xl">
                                    <span className="text-accent">HOMEPAGE</span> BANNER
                                </TextHeader>
                                <div className="flex flex-col space-y-4 line-clamp-6 2xl:line-clamp-none hover:line-clamp-none">
                                    <Paragraph>
                                        Advertise your business on The Art of Film homepage. Homepage advertisements are
                                        slightly larger than web listings, however there is limited premium space
                                        available.
                                    </Paragraph>
                                    <Paragraph>
                                        The price of a homepage banner is £350 per year. Once you have purchased your
                                        homepage advertising a member of The Art of Film will be in touch to discuss the
                                        artwork for your advert.
                                    </Paragraph>
                                </div>
                            </div>
                            <Link to="/advertise" className="bg-accent w-fit py-2 px-6">
                                <Paragraph>Advertise with us</Paragraph>
                            </Link>
                        </div>

                        <div className="flex-1">
                            <img src="/images/poster-1.jpg" alt="" className={classNames("w-full")} />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="w-full flex flex-col flex-1 justify-between space-y-8">
                            <div className="flex flex-col space-y-8">
                                <TextHeader className="text-4xl sm:text-6xl">
                                    <span className="text-accent">ADVERTORIAL</span>
                                </TextHeader>
                                <div className="flex flex-col space-y-4 line-clamp-6 2xl:line-clamp-none hover:line-clamp-none">
                                    <Paragraph>
                                        Create an advertorial for your business and have this appear as a homepage
                                        feature, a blog and it will also be pushed on all The Art of Film social media
                                        platforms.
                                    </Paragraph>
                                    <Paragraph>
                                        The content of your advertorial must include valuable content for movie poster
                                        enthusiasts and will include links directly to your website. The price of an
                                        advertorial is £500.
                                    </Paragraph>
                                    <Paragraph>
                                        Once you have purchased your advertorial a member of The Art of Film will be in
                                        touch to discuss the artwork for your advert.
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
                            <Link to="/advertise" className="bg-accent w-fit py-2 px-6">
                                <Paragraph>Advertise with us</Paragraph>
                            </Link>
                        </div>

                        <div className="flex-1">
                            <img src="/images/news-paper.png" alt="" className={classNames("w-full")} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseWithUs;
