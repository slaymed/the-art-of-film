import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";

import TextHeader from "./elements/TextHeader";

export interface FooterProps extends ComponentProps<"footer"> {}

const Footer: FC<FooterProps> = ({ className = "", ...rest }) => {
    return (
        <footer {...rest} className={classNames("bg-footer ", { [className]: className })}>
            <div className="max-w-full overflow-x-auto scroll-bar">
                <div className={classNames("py-10 flex justify-between px-4")}>
                    <div className="flex-shrink-0 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="border-b-2 border-accent h-full flex flex-col space-y-8 pb-4">
                            <TextHeader className="text-3xl">Get In Touch</TextHeader>
                            <div className="flex flex-col">
                                <div className="space-x-2">
                                    <i className="fa-solid fa-location-dot" />
                                    <span>London, UK</span>
                                </div>
                                <div className="space-x-2 text-accent">
                                    <i className="fa-solid fa-envelope" />
                                    <a href="mailto:admin@theartoffilm.co.uk">admin@theartoffilm.co.uk</a>
                                </div>
                            </div>

                            <div className="flex space-x-6 w-fit">
                                <a href="https://www.facebook.com/Henry4film/" target="_blank" rel="noreferrer">
                                    <i className="text-blue-600/80 fa-brands fa-facebook" />
                                </a>

                                <a
                                    href="https://www.instagram.com/the_artoffilm/?utm_medium=copy_link"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="text-pink-600 fa-brands fa-instagram" />
                                </a>

                                <a
                                    href="https://www.youtube.com/channel/UCYDDoM6EPQryVyCzW9G-Ryg"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <i className="text-red-600 fa-brands fa-youtube" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="border-b-2 border-accent h-full flex flex-col space-y-8 pb-4">
                            <TextHeader className="text-3xl">Things to know</TextHeader>
                            <div className="flex flex-col">
                                <Link className="tracking-wider" to="/page/subscriptions">
                                    Subscribe
                                </Link>
                                <Link to="/shop/posters/sold">Sold Posters</Link>
                                <Link className="tracking-wider" to="/advertise-with-us">
                                    Advertise With Us
                                </Link>
                                <Link className="tracking-wider" to="/poster-grading-categories">
                                    Posters Condition Grading
                                </Link>
                                <Link className="tracking-wider" to="/terms">
                                    Terms & Conditions
                                </Link>
                                <Link className="tracking-wider" to="/privacy">
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="border-b-2 border-accent h-full flex flex-col space-y-8 pb-4">
                            <TextHeader className="text-3xl">Site-map</TextHeader>
                            <div className="flex flex-col">
                                <Link className="tracking-wider" to="/">
                                    Home
                                </Link>
                                {/* <Link to="/about-us">About Us</Link> */}
                                <Link className="tracking-wider" to="/shop/name">
                                    Shop
                                </Link>
                                <Link className="tracking-wider" to="/sellers">
                                    Showcase
                                </Link>
                                <Link className="tracking-wider" to="/faq">
                                    FAQs
                                </Link>
                                {/* <Link to="/contact">Contact</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="border-b-2 border-accent h-full flex flex-col space-y-8 pb-4">
                            <TextHeader className="text-3xl">NEWS & BLOG FEED</TextHeader>
                            <div className="flex flex-col">
                                <Link className="tracking-wider" to="/grahamhumpreys">
                                    Graham Humphreys
                                </Link>
                                <Link className="tracking-wider" to="/why-film-posters">
                                    Why Film Posters?
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 px-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                        <div className="border-b-2 border-accent h-full flex flex-col space-y-8 pb-4">
                            <TextHeader className="text-3xl">Insta Feeds</TextHeader>
                            <div>
                                <InstagramFeed
                                    token={
                                        "EAADnl4w17Q8BAPvriAK3SdLL7smNeL4ZAi17IvetyC8ZC77accQnTTeMPqMVgNo7Nx67W4SEbcs48px2jKPeD6LvJTZCoWGrE0oIDhJomItBqFlYwrlrP7b0dFnTM9kM01xdarqoPgI7TrOMkckkMqp9ILBaWd38rDMCm5HLWfJxkYyWIhS"
                                    }
                                    counter="6"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-black text-tcolor flex justify-center items-center p-2">
                <span className={"text-small"}>Copyright © 2022 The Art of Film</span>
            </div>
        </footer>
    );
};

export default Footer;
