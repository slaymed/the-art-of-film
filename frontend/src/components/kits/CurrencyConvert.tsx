import React, { FC, memo } from "react";
import { useSelector } from "react-redux";

import { currencySelector, ratesSelector, symbolSelector } from "../../store/currency/selectors";
import { Currency } from "../../store/currency/types";
import { GBP } from "../../store/currency/constants";

export interface CurrencyConvertProps {
    amount: number;
    from?: Currency;
}

const CurrencyConvert: FC<CurrencyConvertProps> = ({ amount = 0, from = GBP }) => {
    const currency = useSelector(currencySelector);
    const rates = useSelector(ratesSelector);
    const symbol = useSelector(symbolSelector);

    if (from === currency)
        return (
            <>
                {symbol}
                {amount.toFixed(2)}
            </>
        );

    return (
        <>
            {symbol}
            {(amount * rates[currency]).toFixed(2)}
        </>
    );
};

export default memo(CurrencyConvert);
