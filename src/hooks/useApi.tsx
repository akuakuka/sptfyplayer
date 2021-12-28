import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";


/* export type APIResponse = {
    status: number;
    statusText: string;
    data: any;
    error: any;
    loading: boolean;
};
 */
/* const useAsync = <T, E = string>(
    asyncFunction: () => Promise<T>,
    immediate = true
  ) => {
 */




export const useAPI = <T, E = string | undefined>(
    asyncFunction: (s?: E) => Promise<T>,
    immediate
) => {
    console.log({ immediate })
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<AxiosError>(Object);

    const execute = useCallback(() => {
        setLoading(true);
        setData(null);
        // TODO : async / await synmtax
        return asyncFunction()
            .then((response: any) => {
                console.log("useApi then")
                console.log(response)
                setData(response);
                setLoading(false);
            })
            .catch((error: AxiosError) => {
                console.log("useApi error")
                setError(error);
                setLoading(false);
            });
    }, [asyncFunction]);

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);
    return { execute, loading, data, error };

}