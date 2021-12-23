import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
// setQue?: (a: string[]) => void;
/* export const useAPI = () => {
/*     const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        (async () => {
            console.log("useAPI useEffect=>")
            try {
                setLoading(true);
                const response = await apiFunction()
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []); */

/*  return { data, error, loading }; */




/* 
export const useAPI = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Object>({});
    const [response, setResponse] = useState<Object>({});
    // TODO: Types
    const apiWrapper = async (callback): Promise<any> => {
        setLoading(true);
        try {
            const response = await callback()
            setResponse(response)
            setLoading(false);
        } catch (e) {
            //@ts-ignore
            setError(e)
            setLoading(false);
        }

    };

    return [loading, apiWrapper, error, response];
}; */


export type APIResponse = {
    status: number;
    statusText: string;
    data: any;
    error: any;
    loading: boolean;
};

export const useAPI = (url: string, API: AxiosInstance): APIResponse => {
    const [status, setStatus] = useState<number>(0);
    const [statusText, setStatusText] = useState<string>('');
    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    //  const { data } = await API.get<spotifyArtist[]>(`/artists`);
    const getAPIData = async () => {
        setLoading(true);
        try {
            /*      const apiResponse = await fetch(url);
                 const json = await apiResponse.json(); */
            const response = await API.get(url)
            setStatus(response.status);
            setStatusText(response.statusText);
            setData(response.data);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getAPIData();
    }, []);

    return [status, statusText, data, error, loading];
};