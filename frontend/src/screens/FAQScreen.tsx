import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import FAQPage from "../components/pages/FAQPage";

export interface FAQScreenProps extends ComponentProps<"div"> {}

const FAQScreen: FC<FAQScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("", { [className]: className })}>
            <FAQPage />
        </div>
    );
};

export default FAQScreen;
