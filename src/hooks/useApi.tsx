import { createStandaloneToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
// TODO: axios error types
export const useAPI = <T, E = string | undefined>(
  asyncFunction: (s?: E) => Promise<T>,
  immediate
) => {
  const toast = createStandaloneToast();
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
      console.log(e);
      setError(e);
      setLoading(false);
      toast({
        title: "An error occurred.",
        description: JSON.stringify(e.message),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, loading, data, error };
};
