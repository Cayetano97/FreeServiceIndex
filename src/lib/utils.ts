import { useState, useCallback, useEffect } from "react";

export function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

export function useUrlParam(
  param: string,
  defaultVal: string,
): [string, (val: string) => void] {
  const readParam = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get(param) || defaultVal;
  }, [param, defaultVal]);

  const [value, setValue] = useState<string>(readParam);

  useEffect(() => {
    const onPop = () => setValue(readParam());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [readParam]);

  const setParam = useCallback(
    (val: string) => {
      const url = new URL(window.location.href);
      if (val === defaultVal) {
        url.searchParams.delete(param);
      } else {
        url.searchParams.set(param, val);
      }
      window.history.replaceState({}, "", url.toString());
      setValue(val);
    },
    [param, defaultVal],
  );

  return [value, setParam] as const;
}
