import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

export function useDebouncedValue<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedSetter = useMemo(
    () =>
      debounce((next: T) => {
        setDebouncedValue(next);
      }, delay),
    [delay],
  );

  useEffect(() => {
    debouncedSetter(value);

    return () => {
      debouncedSetter.cancel();
    };
  }, [value, debouncedSetter]);

  return debouncedValue;
}
