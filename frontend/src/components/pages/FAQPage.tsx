import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import HeroSection from "../sections/HeroSection";
import TextHeader from "../elements/TextHeader";
import Accordion from "../cards/Accordion";

export interface FAQPageProps extends ComponentProps<"div"> {
    subscriptionFAQsOnly?: boolean;
    header?: boolean;
}

const FAQPage: FC<FAQPageProps> = ({ className = "", subscriptionFAQsOnly, header = true, ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            {header && <HeroSection heading="FAQs" heading2="Home/FAQs" image="/images/theater.jpeg" />}

            <div className="p-8 sm:p-12 bg-light-dark">
                <div className="w-11/12 flex flex-col space-y-32 mx-auto">
                    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                        <div className="flex flex-col space-y-8 w-full">
                            <TextHeader className="text-4xl sm:text-6xl">
                                <span className="text-accent">SUBSCRIPTION</span> FAQS
                            </TextHeader>

                            <div className="flex flex-col space-y-4">
                                <Accordion
                                    title="Can I just subscribe to buy posters?"
                                    text="You do not need a subscription to buy posters but you would need a subscription to sell posters."
                                />
                                <Accordion
                                    title="If I cancel my subscription will I lose my showcase?"
                                    text="Yes, if you cancel your subscription you will lose access to your showcase and your showcase will not be visible on the site."
                                />
                                <Accordion
                                    title="Do subscriptions auto renew?"
                                    text="Yes your subscription will auto renew until you cancel  your subscription via your Dashboard. Please refer to our Terms and Conditions"
                                />
                                <Accordion
                                    title="Can I subscribe from anywhere in the world?"
                                    text="Yes, the Site is a global platform."
                                />
                                <Accordion
                                    title="What subscriptions do you offer? "
                                    text="We offer a range of monthly and annual subscriptions.  Please visit our Pricing page for further information."
                                />
                                <Accordion
                                    title="What if I want to display more posters than my subscription will allow? "
                                    text="If you require additional poster templates you can upgrade your subscription package on your Dashboard."
                                />
                            </div>
                        </div>

                        <div className="w-full h-full sm:w-[386px] sm:h-[600px] flex-shrink-0">
                            <img src="/images/faq.jpg" alt="" className="max-w-full max-h-full" />
                        </div>
                    </div>

                    {!subscriptionFAQsOnly && (
                        <>
                            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                                <div className="hidden lg:block w-full h-full sm:w-[386px] sm:h-[600px] flex-shrink-0">
                                    <img src="/images/faq1.jpg" alt="" className="max-w-full max-h-full" />
                                </div>

                                <div className="flex flex-col space-y-8 w-full">
                                    <TextHeader className="text-4xl sm:text-6xl">
                                        <span className="text-accent">SHOWCASE</span> FAQS
                                    </TextHeader>

                                    <div className="flex flex-col space-y-4">
                                        <Accordion
                                            title="DO I HAVE TO SUBSCRIBE TO DISPLAY MY MOVIE POSTERS ON THE ART OF FILM?"
                                            text="Yes."
                                        />
                                        <Accordion
                                            title="WHAT DOES A SHOWCASE TEMPLATE INCLUDE?"
                                            text="Each template includes frames to upload your poster images, dropdown menus to fill in all the details you want – director, format, condition, artist, cast, year of release etc and notes to fill in any special details you require."
                                        />
                                        <Accordion
                                            title="ONCE I SUBSCRIBE, DO I HAVE TO SHOW MY POSTER COLLECTION ON THE WEBSITE?"
                                            text="No – you have the choice whether to keep your collection private or share it with other subscribers around the world. You can share 1 page or your entire collection if you so wish."
                                        />
                                        <Accordion
                                            title="IF I CANCEL MY SHOWCASE WILL I LOSE MY SUBSCRIPTION?"
                                            text="Yes, if you cancel your subscription you will lose access to your showcase and your showcase will not be visible on the site."
                                        />
                                    </div>
                                </div>

                                <div className="lg:hidden w-full h-full sm:w-[386px] sm:h-[600px] flex-shrink-0">
                                    <img src="/images/faq1.jpg" alt="" className="max-w-full max-h-full" />
                                </div>
                            </div>
                            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-16 lg:space-y-0 space-between">
                                <div className="flex flex-col space-y-8 w-full">
                                    <TextHeader className="text-4xl sm:text-6xl">
                                        <span className="text-accent">BUY & SELL</span> FAQS
                                    </TextHeader>

                                    <div className="flex flex-col space-y-4">
                                        <Accordion
                                            title="CAN I SELL POSTERS WITHOUT A SUBSCRIPTION"
                                            text="No, you would need a subscription to sell posters and memorabilia.  You can take out a rolling monthly subscription until your poster is sold."
                                        />

                                        <Accordion
                                            title="CAN I JUST SUBSCRIBE TO BUY POSTERS?"
                                            text="You do not need a subscription to buy posters but you would need a subscription to sell posters."
                                        />

                                        <Accordion
                                            title="HOW MUCH DOES THE ART OF FILM TAKE FROM POSTER SALES?"
                                            text="We only take 6% of sales from the Poster Shop."
                                        />

                                        <Accordion
                                            title="CAN I SHOWCASE OR SELL OTHER FILM MEMORABILIA?"
                                            text="Yes – you can showcase and sell film related paper items – lobby cards, stills etc."
                                        />

                                        <Accordion
                                            title="DOES THE ART OF FILM ORGANISE POSTAGE?"
                                            text="No – if you are selling posters or film memorabilia on the site, it will be down to the seller to set postage rates. We recommend always sending with a tracking number for your piece of mind."
                                        />

                                        <Accordion
                                            title="CAN I SELL REPRODUCTIONS?"
                                            text="No – The Art of Film is only for collectors of original film posters and memorabilia."
                                        />

                                        <Accordion
                                            title="CAN I SELL MONDO PRINTS"
                                            text="Yes Mondo prints are acceptable on The Art of Film"
                                        />

                                        <Accordion
                                            title="WHO GRADES THE POSTERS ON THE WEBSITE?"
                                            text="It is down to the individual subscriber to grade their own poster collection. We have provided a Grading Guide on the website."
                                        />

                                        <Accordion
                                            title="I OWN AN ONLINE FILM POSTER SHOP – HOW DO I ADD MY LINK TO THE ART OF FILM?"
                                            text="To add a live link to your film poster shop – our subscribers will then be able to access your shop at the touch of a button."
                                            link="Contact Us"
                                        />
                                    </div>
                                </div>
                                <div className="w-full h-full sm:w-[386px] sm:h-[600px] flex-shrink-0">
                                    <img src="/images/faq2.jpg" alt="" className="max-w-full max-h-full" />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;
