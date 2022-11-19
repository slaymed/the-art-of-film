import React, { ComponentProps, FC } from "react";
import classNames from "classnames";
import TextHeader from "../components/elements/TextHeader";

export interface MapScreenProps extends ComponentProps<"div"> {}

const MapScreen: FC<MapScreenProps> = ({ className = "", ...rest }) => {
    return (
        <div {...rest} className={classNames("p-8 text-center bg-light-dark", { [className]: className })}>
            <TextHeader className="text-3xl sm:text-6xl text-accent">Page Not Available</TextHeader>
        </div>
    );
};

export default MapScreen;
