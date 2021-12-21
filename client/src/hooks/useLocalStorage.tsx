import { useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    console.log("setValue");
    try {
      //@ts-ignore
      const valueToStore =
        //@ts-ignore
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};
