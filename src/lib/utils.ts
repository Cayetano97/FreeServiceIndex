import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function useUrlParam(
  param: string,
  defaultVal: string,
): [string, (val: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(param) || defaultVal;
  const setValue = useCallback(
    (val: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (val === defaultVal) {
          next.delete(param);
        } else {
          next.set(param, val);
        }
        return next;
      });
    },
    [param, defaultVal, setSearchParams],
  );
  return [value, setValue] as const;
}
