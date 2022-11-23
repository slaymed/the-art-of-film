import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import TextHeader from "../components/elements/TextHeader";
import Paragraph from "../components/elements/Paragraph";

export interface WhyFilmPostersProps extends ComponentProps<"div"> {}

const WhyFilmPosters: FC<WhyFilmPostersProps> = ({ className = "", ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("p-8 sm:p-16 sm:gap-16 bg-light-dark", {
                [className]: className,
            })}
        >
            <div className="flex flex-col gap-8 sm:gap-16 mx-auto max-w-[1050px]">
                <div className="flex w-full flex-col lg:flex-row mx-auto gap-8 sm:gap-16">
                    <div className=" flex flex-col gap-8 w-full">
                        <TextHeader className="text-6xl sm:text-7xl">
                            <span className="text-accent">PASSIONATE</span> FILM POSTER COLLECTOR
                        </TextHeader>
                        <div className="w-full flex flex-col gap-8">
                            <Paragraph className="w-full tracking-wider text-slate-400 leading-7 line-clamp-6 hover:line-clamp-none lg:line-clamp-none">
                                Film posters are my passion and I’ve been collecting film posters and movie memorabilia
                                probably since I was about 13 years old – I became friends with my local cinema managers
                                and video shop owners in the 1980s. They used to give me film and video posters once the
                                run was over – anything film-related that was destined for the bin would inevitably land
                                up in my bedroom as a teenager.By the time I was in my mid-teens, I had no wall space or
                                even ceiling space left. Most of my friends had pictures of movie stars or favourite
                                bands up on their walls I had Kubrick posters, Coppola posters, Spielberg posters,
                                DePalma posters and so much more on my walls (OK – and 1 poster of my favourite group
                                back then Queen!). Arriving in London in my late teens, I discovered Film Fairs – 4
                                shows a year or so, which reignited my passion for collecting film posters. My interest
                                started growing again – initially I was only collecting Stanley Kubrick material,
                                however over time it has widened to encompass a huge range of titles.
                            </Paragraph>
                        </div>
                    </div>
                    <div className="w-full h-full">
                        <img
                            src="/images/Henry-Bedroom-1.jpg"
                            alt="Poster"
                            className="border-4 border-accent max-w-full max-h-[592px] mx-auto"
                        />
                    </div>
                </div>

                <div className="w-full">
                    <img
                        className="border-accent border-4 max-w-full mx-auto"
                        src="/images/Henry-Bedroom-2-1024x688.jpg"
                        alt="Banner"
                    />
                </div>

                <div className="flex flex-col w-full gap-8">
                    <TextHeader className="text-6xl sm:text-7xl">
                        <span className="text-accent">WHY I STARTED</span> COLLECTING POSTERS
                    </TextHeader>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        There are 3 main reasons why I collect film posters – firstly I love the artwork that
                        encapsulates the film – as soon as you look at a specific poster, the film comes flooding back
                        to you.
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        We all have our favourite movies – some of mine include Zulu, Lawrence of Arabia, Monty Python
                        and the Holy Grail, Jaws, 2001 A Space Odyssey, Star Wars, Close Encounters of the Third Kind,
                        Raiders of the Lost Ark and many more of course, and I am lucky enough to have all these
                        original cinema release posters in my collection – some in multiple formats from around the
                        world.
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        Secondly the original poster artists created such iconic images that are recognisable around the
                        world. Secondly, a lot of classic titles are valuable or are becoming more valuable over time.
                        So they are investment pieces as well as works of art. And thirdly,
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        I just love looking at them framed up on my walls. It gives me a sense of joy to see a favourite
                        original film poster displayed as they were designed to do.
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        I suppose I would really love my own independent cinema – all the décor and posters would be
                        treated with utmost love and respect – one day I will build my own home cinema! So today, my
                        original film poster collection stretches to over 600 titles from around the world
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        I love the UK quad format, but I also have many US 1 sheets, French grandes and petites, Italian
                        photobustas and locandinas, Australian Daybills and Japanese B2 format posters, ranging in date
                        from the 1930s to the modern-day.
                    </Paragraph>
                </div>

                <div className="flex flex-col w-full gap-8">
                    <TextHeader className="text-6xl sm:text-7xl">
                        <span className="text-accent">THE ART OF</span> FILM
                    </TextHeader>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        I have founded The Art of Film as a complete umbrella website for all movie poster collectors
                        from around the world – I have found it quite frustrating over the years to not be able to
                        collate my entire collection as well as speak to other collectors and buy and sell all under 1
                        virtual roof! Now it will be possible,
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        It will be THE place for you to add your whole poster collection and share it with 1 person, the
                        whole world, or no one at all – keep it totally private.
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        You will also be able to upload all your original movie posters for sale, set your own price and
                        have all the other collectors around the world view it and purchase directly from you. There
                        will also be a link list of film poster stores around the world, so you can quickly access their
                        stock.
                    </Paragraph>
                    <Paragraph className="tracking-wider leading-6 text-slate-400">
                        The Art of Film is designed for serious film poster collectors globally, to showcase your
                        collections and to buy and sell orginal movie posters. I look forward to your support – you will
                        make The Art of Film a film poster force to be reckoned with!
                    </Paragraph>
                </div>

                <div className="w-full">
                    <img
                        className="border-accent border-4 max-w-full mx-auto"
                        src="/images/news-paper.png"
                        alt="Banner"
                    />
                </div>

                <Paragraph className="text-lg text-slate-400">
                    Contact Henry Coleman the author{" "}
                    <a className="text-accent" href="mailto:admin@theartoffilm.co.uk">
                        admin@theartoffilm.co.uk
                    </a>
                </Paragraph>
            </div>
        </div>
    );
};

export default WhyFilmPosters;
