import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import HowOneImage from "../../assets/images/How-1.jpg";
import HowTwoImage from "../../assets/images/How-2.png";
import HowThreeImage from "../../assets/images/How-3.jpg";
import TextHeader from "../elements/TextHeader";

export interface HowItWorksSectionProps extends ComponentProps<"div"> {}

const HowItWorksSection: FC<HowItWorksSectionProps> = ({ className = "", style = {}, ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames(
                "flex bg-light-dark flex-col p-12 sm:px-24 sm:py-16 md:px-24 md:py-16 lg:px-12 xl:px-16 space-y-4 justify-center items-center",
                {
                    [className]: className,
                }
            )}
        >
            <TextHeader className="text-5xl sm:text-7xl">
                <span className="text-accent">How</span> It Works
            </TextHeader>
            <p className="max-w-2xl text-center">
                When you subscribe to The Art of Film you will have access to a unique platform that allows you to
                showcase and manage your movie poster collection as well as sell movie posters and memorabilia.
            </p>
            <br />
            <br />
            <div className="flex flex-col space-y-16 lg:space-y-0 lg:flex-row lg:space-x-12 lg:p-12 xl:p-16 xl:space-x-16 text-accent">
                <div className="w-full border-4 border-accent">
                    <img src={HowOneImage} className="w-full lg:max-w-none" alt="How it works" />
                    <TextHeader className="p-4 text-center text-2xl lg:text-xl xl:text-2xl">
                        CHOOSE YOUR SUBSCRIPTION
                    </TextHeader>
                </div>
                <div className="w-full border-4 border-accent">
                    <img src={HowTwoImage} className="w-full lg:max-w-none" alt="How it works" />
                    <TextHeader className="p-4 text-center text-2xl lg:text-xl xl:text-2xl">
                        Create your account
                    </TextHeader>
                </div>
                <div className="w-full border-4 border-accent">
                    <img src={HowThreeImage} className="w-full lg:max-w-none" alt="How it works" />
                    <TextHeader className="p-4 text-center text-2xl lg:text-xl xl:text-2xl">
                        Upload your movie posters
                    </TextHeader>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksSection;
