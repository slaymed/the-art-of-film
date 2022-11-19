import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import ShowcaseImage from "../../assets/images/Showcase.png";
import SellImage from "../../assets/images/Sell.png";

export interface WelcomeSectionProps extends ComponentProps<"div"> {}

const WelcomeSection: FC<WelcomeSectionProps> = ({ className = "", style = {}, ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("flex mx-auto justify-between max-w-3xl mt-8", {
                [className]: className,
            })}
            style={{ ...style, padding: "5em 0" }}
        >
            <div className="flex flex-col items-center justify-center m-8 space-y-6">
                <img src={ShowcaseImage} alt="" />
                <p>Showcase your movie poster collection</p>
            </div>
            <div className="flex flex-col items-center justify-center m-8 space-y-6">
                <img src={SellImage} alt="" />
                <p>Sell your original movie posters</p>
            </div>
        </div>
    );
};

export default WelcomeSection;
