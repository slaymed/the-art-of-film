import { GlobalOperation } from "../types";
import { EUR, GBP, JPY, USD } from "./constants";

export type Currency = typeof USD | typeof GBP | typeof JPY | typeof EUR;
export type Rates = { [USD]: number; [GBP]: number; [JPY]: number; [EUR]: number };

export interface ICurrencyState {
    fetchingRates: GlobalOperation;
    rates: Rates;
    currency: Currency;
    symbol: string;
}
