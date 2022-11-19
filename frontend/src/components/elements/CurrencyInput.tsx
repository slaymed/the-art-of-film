import React, { FC, ComponentProps } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";

import AppInput from "./AppInput";
import Paragraph from "./Paragraph";
import CurrencyConvert from "../kits/CurrencyConvert";

import { currencySelector } from "../../store/currency/selectors";
import { GBP } from "../../store/currency/constants";

export interface CurrencyInputProps extends ComponentProps<"input"> {}

const CurrencyInput: FC<CurrencyInputProps> = ({ className = "", value, ...rest }) => {
    const currency = useSelector(currencySelector);

    return (
        <div className={classNames("flex flex-col space-y-2", { [className]: className })}>
            <AppInput {...rest} value={value} type="number" />
            {currency !== GBP && value && (
                <Paragraph className="text-sm text-accent">
                    Converted to your currency: <CurrencyConvert amount={parseFloat(value.toString())} />
                </Paragraph>
            )}
        </div>
    );
};

export default CurrencyInput;
