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
                <div className="px-8 py-4 flex justify-between gap-16 flex-wrap">
                    <div className="flex-shrink-0 w-fit">
                        <div className="border-b-2 border-accent h-full flex flex-col gap-4 py-4">
                            <TextHeader className="text-3xl text-accent">Get In Touch</TextHeader>
                            <div className="flex flex-col gap-1">
                                <div className="space-x-2">
                                    <i className="fa-solid fa-location-dot" />
                                    <span>London, UK</span>
                                </div>
                                <div className="space-x-2 text-accent">
                                    <i className="fa-solid fa-envelope" />
                                    <a href="mailto:admin@theartoffilm.co.uk">admin@theartoffilm.co.uk</a>
                                </div>
                            </div>

                            <div className="flex gap-6 w-fit">
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
                    <div className="flex-shrink-0 w-fit">
                        <div className="border-b-2 border-accent h-full flex flex-col gap-4 py-4">
                            <TextHeader className="text-3xl text-accent">Things to know</TextHeader>
                            <div className="flex flex-col gap-1">
                                <Link
                                    className="tracking-wider hover:text-accent duration-200"
                                    to="/page/subscriptions"
                                >
                                    Subscribe
                                </Link>
                                <Link to="/shop?filter=sold" className="tracking-wider hover:text-accent duration-200">
                                    Sold Posters
                                </Link>
                                <Link className="tracking-wider hover:text-accent duration-200" to="/advertise-with-us">
                                    Advertise With Us
                                </Link>
                                <Link
                                    className="tracking-wider hover:text-accent duration-200"
                                    to="/poster-grading-categories"
                                >
                                    Posters Condition Grading
                                </Link>
                                <Link className="tracking-wider hover:text-accent duration-200" to="/terms">
                                    Terms & Conditions
                                </Link>
                                <Link className="tracking-wider hover:text-accent duration-200" to="/privacy">
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-fit">
                        <div className="border-b-2 border-accent h-full flex flex-col gap-4 py-4">
                            <TextHeader className="text-3xl text-accent">Site-map</TextHeader>
                            <div className="flex flex-col gap-1">
                                <Link className="tracking-wider hover:text-accent duration-200" to="/">
                                    Home
                                </Link>
                                {/* <Link to="/about-us">About Us</Link> */}
                                <Link className="tracking-wider hover:text-accent duration-200" to="/shop">
                                    Shop
                                </Link>
                                <Link className="tracking-wider hover:text-accent duration-200" to="/sellers">
                                    Showcase
                                </Link>
                                <Link className="tracking-wider hover:text-accent duration-200" to="/faq">
                                    FAQs
                                </Link>
                                {/* <Link to="/contact">Contact</Link> */}
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-fit">
                        <div className="border-b-2 border-accent h-full flex flex-col gap-4 py-4">
                            <TextHeader className="text-3xl text-accent">NEWS & BLOG FEED</TextHeader>
                            <div className="flex flex-col gap-1">
                                <Link className="tracking-wider hover:text-accent duration-200" to="/grahamhumpreys">
                                    Graham Humphreys
                                </Link>
                                <Link className="tracking-wider hover:text-accent duration-200" to="/why-film-posters">
                                    Why Film Posters?
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-fit">
                        <div className="border-b-2 border-accent h-full flex flex-col gap-4 py-4">
                            <TextHeader className="text-3xl text-accent">Insta Feeds</TextHeader>
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
