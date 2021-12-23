import { useCallback, useEffect, useRef } from "react";

const useTimeout = (callback: () => void, delay: number) => {
  const callbackRef = useRef<() => void>(callback);
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
};

export const useDebounce = (
  callback: () => void,
  delay: number,
  dependencies: string[]
) => {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
};
