import React, { FC, ComponentProps, FormEvent, useState, ChangeEvent } from "react";
import classNames from "classnames";

import HeroSection from "../components/sections/HeroSection";
import H1 from "../components/elements/H1";
import AppInput from "../components/elements/AppInput";
import Button from "../components/elements/Button";
import TextHeader from "../components/elements/TextHeader";

export interface ContactScreenProps extends ComponentProps<"div"> {}

const initialState = {
    name: "",
    subject: "",
    email: "",
    message: "",
};

const ContactScreen: FC<ContactScreenProps> = ({ className = "", ...rest }) => {
    const [vars, setVars] = useState(initialState);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setVars((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <HeroSection heading="Contact US" heading2="Home/Contact" image="/images/theater.jpeg" />

            <form className="flex flex-col max-w-2xl mx-auto space-y-6 form px-8 py-16" onSubmit={handleSubmit}>
                <H1 className="text-5xl">Contact</H1>

                <div className="flex flex-col">
                    <label htmlFor="name">Name</label>
                    <AppInput
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Name"
                        required
                        value={vars.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="subject">Subject</label>
                    <AppInput
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Enter Subject"
                        required
                        value={vars.subject}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <AppInput
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        required
                        value={vars.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="Enter Message"
                        className="p-2 placeholder:text-white text-sm font-bold uppercase text-black resize-none"
                        rows={3}
                        required
                        value={vars.message}
                        onChange={handleChange}
                    />
                </div>

                <Button className="py-2 px-4 text-black w-fit self-end bg-white" type="submit">
                    <TextHeader className="text-lg">Submit</TextHeader>
                </Button>
            </form>

            <div className="flex column">
                <iframe
                    className="contact-iframe w-full border-none"
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d39733.188867049495!2d-0.16260549894606588!3d51.50726600940145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m1!2srigin%3Dmfe%26pb%3D*211m4*212m1*211sLondon*215e0*216i10!4m5!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2z2YTZhtiv2YYg2LPZhNi32YbYqiDZhdiq2K3Yr9uB4oCt!3m2!1d51.5072178!2d-0.12758619999999998!5e0!3m2!1sen!2s!4v1654630076593!5m2!1sen!2s"
                    width="600"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
};

export default ContactScreen;
