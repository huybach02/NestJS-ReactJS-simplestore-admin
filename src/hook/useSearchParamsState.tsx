/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

export const useSearchParamsState = (
  defaultValues: Record<string, any> = {}
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = useState(() => {
    const initialState: Record<string, any> = {};

    Object.keys(defaultValues).forEach((key) => {
      initialState[key] = searchParams.get(key) || defaultValues[key];
    });

    return initialState;
  });

  useEffect(() => {
    const params: Record<string, string> = {};
    Object.entries(state).forEach(([key, value]) => {
      if (value !== "") {
        params[key] = String(value);
      }
    });
    setSearchParams(params);
  }, [state]);

  const updateState = (newState: Partial<Record<string, any>>) => {
    setState((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  return [state, updateState] as const;
};
