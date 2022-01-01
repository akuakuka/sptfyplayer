import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";

export const useAPI = <T, E = string | undefined>(
  asyncFunction: (s?: E) => Promise<T>,
  immediate
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError>(Object);

  const execute = useCallback(async () => {
    setLoading(true);
    setData(null);
    try {
      const response = await asyncFunction();
      setData(response);
      setLoading(false);
    } catch (e) {
      console.log("useApi error");
      setError(error);
      setLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, loading, data, error };
};
