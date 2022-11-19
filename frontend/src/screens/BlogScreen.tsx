import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import HeroSection from "../components/sections/HeroSection";
import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";

export interface BlogScreenProps extends ComponentProps<"div"> {}

const BlogScreen: FC<BlogScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <HeroSection heading="Why Film Posters?" heading2="" image="/images/Henry-Bedroom-2-1.jpg" />

            <div className="p-8 sm:p-12 bg-light-dark">
                <div className="w-11/12 flex flex-col space-y-32 mx-auto">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="flex flex-col space-y-8 w-full">
                            <TextHeader className="text-4xl sm:text-6xl">
                                <span className="text-accent">PASSIONATE</span> FILM POSTER COLLECTOR
                            </TextHeader>
                            <div className="flex flex-col space-y-4 line-clamp-6 lg:line-clamp-none">
                                <Paragraph>
                                    There are 3 main reasons why I collect film posters – firstly I love the artwork
                                    that encapsulates the film – as soon as you look at a specific poster, the film
                                    comes flooding back to you.
                                </Paragraph>
                                <Paragraph className="lg:line-clamp-3 xl:line-clamp-none hover:line-clamp-none">
                                    We all have our favourite movies – some of mine include Zulu, Lawrence of Arabia,
                                    Monty Python and the Holy Grail, Jaws, 2001 A Space Odyssey, Star Wars, Close
                                    Encounters of the Third Kind, Raiders of the Lost Ark and many more of course, and I
                                    am lucky enough to have all these original cinema release posters in my collection –
                                    some in multiple formats from around the world.
                                </Paragraph>
                                <Paragraph className="lg:line-clamp-3 xl:line-clamp-none hover:line-clamp-none">
                                    Secondly the original poster artists created such iconic images that are
                                    recognisable around the world. Secondly, a lot of classic titles are valuable or are
                                    becoming more valuable over time.
                                </Paragraph>
                                <Paragraph className="lg:line-clamp-3 xl:line-clamp-none hover:line-clamp-none">
                                    So they are investment pieces as well as works of art. And thirdly, I just love
                                    looking at them framed up on my walls. It gives me a sense of joy to see a favourite
                                    original film poster displayed as they were designed to do.
                                </Paragraph>
                                <Paragraph className="lg:line-clamp-3 xl:line-clamp-none hover:line-clamp-none">
                                    I suppose I would really love my own independent cinema – all the décor and posters
                                    would be treated with utmost love and respect – one day I will build my own home
                                    cinema! Contact Henry Coleman the author
                                    <a className="text-accent" href="mailto:admin@theartoffilm.co.uk">
                                        {" "}
                                        admin@theartoffilm.co.uk
                                    </a>
                                </Paragraph>
                            </div>
                        </div>

                        <div className="w-full">
                            <img
                                src="/images/Henry-Bedroom-1.jpg"
                                alt=""
                                className="w-full object-contain lg:max-h-[700px]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="w-full">
                            <img src="/images/Henry-Bedroom-2-1024x688.jpg" alt="" className="w-full" />
                        </div>

                        <div className="flex flex-col space-y-8 w-full">
                            <TextHeader className="text-4xl sm:text-6xl">
                                <span className="text-accent">Film</span> POSTER COLLECTION
                            </TextHeader>
                            <div className="flex flex-col space-y-4 line-clamp-6 xl:line-clamp-none hover:line-clamp-none">
                                <Paragraph>
                                    So today, my original film poster collection stretches to over 600 titles from
                                    around the world – I love the UK quad format, but I also have many US 1 sheets,
                                    French grandes and petites, Italian photobustas and locandinas, Australian Daybills
                                    and Japanese B2 format posters, ranging in date from the 1930s to the modern-day.
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
                </div>
            </div>
        </div>
    );
};

export default BlogScreen;
