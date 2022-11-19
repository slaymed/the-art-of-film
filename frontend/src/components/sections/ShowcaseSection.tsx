import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import SampleImage from "../../assets/images/sample.jpg";
import StarWar from "../../assets/images/star-wars.jpeg";
import Raider from "../../assets/images/raider.jpeg";

import ShowcaseCard from "../cards/ShowcaseCard";

export interface ShowcaseSectionProps extends ComponentProps<"div"> {}

const ShowcaseSection: FC<ShowcaseSectionProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("bg-base ", { [className]: className })}>
            <div className="flex flex-col space-y-8 lg:space-y-16">
                <ShowcaseCard
                    before="Showcase"
                    title="your Movie Posters"
                    text="Manage and showcase your movie collection. Once you have subscribed to The Art of Film you will have access to a minimum of 500 blank template pages with dropdown menus to populate with your own collection information. Choose the format, country of issue, condition, year of release, cast, and crew, etc. You can then choose to keep movie posters in your own private collection and/or you can choose to sell posters through our Movie Poster Shop."
                    image={StarWar}
                    link="/register"
                    linkText="Subscribe Now"
                />
                <ShowcaseCard
                    className="bg-light-dark"
                    reverse
                    before="Manage"
                    title="your Poster Collection"
                    text="Manage and showcase your movie collection. Once you have subscribed to The Art of Film you will have access to a minimum of 500 blank template pages with dropdown menus to populate with your own collection information"
                    image={Raider}
                    link="/register"
                    linkText="Subscribe Now"
                />
                <ShowcaseCard
                    before="BUY AND SELL"
                    title="YOUR MOVIE POSTERS"
                    text="Buy and sell your original movie posters with The Art of Film. Anyone visiting the site will also have the facility to buy your posters. If you have a poster to sell, you add it to the Movie Poster Shop and where site users can see your post and contact you directly to purchase the poster. Over time, The Art of Film will establish an archive of sold titles, so as a subscriber you will be able to go back and see sold poster images as well as see how much it sold for and when. condition, year of release, cast, and crew, etc. You can then choose to keep movie posters in your own private collection and/or you can choose to sell posters through our Movie Poster Shop."
                    image={SampleImage}
                    link="/register"
                    linkText="Subscribe Now"
                />
            </div>
        </div>
    );
};

export default ShowcaseSection;
