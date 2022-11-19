import React, { FC, ComponentProps } from "react";
import classNames from "classnames";

import Paragraph from "../elements/Paragraph";
import Button from "../elements/Button";

export interface FilterCardProps extends ComponentProps<"button"> {
    filter: string;
    alphabet: string;
}

const FilterCard: FC<FilterCardProps> = ({ className = "", filter, alphabet, ...rest }) => {
    return (
        <Button type="button" {...rest}>
            <Paragraph
                key={alphabet}
                className={classNames(
                    "border-2 w-10 h-10 flex justify-center items-center font-bold flex-shrink-0 border-accent",
                    {
                        "bg-accent text-black": filter === alphabet,
                        [className]: className,
                    }
                )}
            >
                {alphabet}
            </Paragraph>
        </Button>
    );
};

export default FilterCard;
