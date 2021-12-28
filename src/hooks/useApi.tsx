import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";


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
    // @ts-ignore
    return [status, statusText, data, error, loading];
};