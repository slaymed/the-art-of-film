import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useQueryParams(...keys: string[]) {
    const [urlSearchParams, setSearchParams] = useSearchParams();

    const queryParams = useMemo(() => {
        const params: { [key: string]: any } = {
            setSearchParams,
        };

        for (const key of keys)
            if (typeof key === "string") {
                const param = urlSearchParams.get(key);
                if (param) params[key] = param;
            }

        return params;
    }, [keys, urlSearchParams]);

    return queryParams;
}
