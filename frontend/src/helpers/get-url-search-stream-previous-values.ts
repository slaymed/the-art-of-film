import { URLSearchParams } from "url";

export const usp_prev = (usp: URLSearchParams) =>
    Array.from(usp.entries())
        .map(([key, value]) => ({ [key]: value }))
        .reduce((a, b) => Object.assign(a, b), {});
