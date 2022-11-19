import axios from "axios";
import { mapErrors } from "./map-errors";

export async function currencyRates({ onResult, onError }) {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "s7sDrj1bUOBNGgb5pWuMG3KJvELeG5q8");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const res = await fetch(
            "https://api.apilayer.com/fixer/latest?base=GBP&?symbols=JPY%2CEUR%2CUSD",
            requestOptions
        );

        return { data: res.json() };
    } catch (errors) {
        return { errors: mapErrors(errors) };
    }
}
