import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { Disclosure, Transition } from "@headlessui/react";

import TextHeader from "../elements/TextHeader";
import Paragraph from "../elements/Paragraph";

export interface AccordionProps extends ComponentProps<"div"> {
    title: string;
    text: string;
    link?: string;
    linkTitle?: string;
}

const Accordion: FC<AccordionProps> = ({ className = "", title, text, link, linkTitle, ...rest }) => {
    return (
        <div
            {...rest}
            className={classNames("flex flex-col space-y-4 py-4 border-b border-accent border-dashed", {
                [className]: className,
            })}
        >
            <Disclosure>
                {({ open }) => (
                    <div className="flex flex-col space-y-4">
                        <Disclosure.Button className="flex items-center justify-between space-x-4">
                            <TextHeader className="text-start w-full text-xl sm:text2xl md:text-3xl tracking-wider text-accent line-clamp-1 hover:line-clamp-none">
                                {title}
                            </TextHeader>
                            <span className="block flex-shrink-0">
                                <i
                                    className={classNames(
                                        "text-2xl fa-solid fa-arrow-right transform -rotate-90 duration-150",
                                        {
                                            "!rotate-90 text-accent": open,
                                        }
                                    )}
                                />
                            </span>
                        </Disclosure.Button>

                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel>
                                <div className="flex flex-col space-y-4">
                                    <Paragraph className="text-sm sm:text-md">{text}</Paragraph>
                                    {link && linkTitle && (
                                        <a target="_blank" rel="noreferrer" href={link}>
                                            <Paragraph className="text-blue-500 text-sm underline">
                                                {linkTitle}
                                            </Paragraph>
                                        </a>
                                    )}
                                </div>
                            </Disclosure.Panel>
                        </Transition>
                    </div>
                )}
            </Disclosure>
        </div>
    );
};

export default Accordion;
