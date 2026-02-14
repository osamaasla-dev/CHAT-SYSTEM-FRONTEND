import { useCallback, useState } from "react";

import { useDebouncedValue } from "./useDebouncedValue";

type UseSearchControllerOptions = {
  /** initial value for the search input */
  initialValue?: string;
  /** debounce delay in ms */
  delay?: number;
  /** minimum length before considering search "active" */
  minLength?: number;
};

export const useSearchController = ({
  initialValue = "",
  delay = 500,
  minLength = 1,
}: UseSearchControllerOptions = {}) => {
  const [value, setValue] = useState(initialValue);
  const debouncedValue = useDebouncedValue(value, delay);

  const trimmed = debouncedValue.trim();
  const isActive = trimmed.length >= minLength;

  const handleChange = useCallback((next: string) => {
    setValue(next);
  }, []);

  const reset = useCallback(() => {
    setValue("");
  }, []);

  return {
    /** instant value bound to the input */
    value,
    /** setter for the instant value */
    setValue,
    /** debounced value to be passed to data hooks */
    debouncedValue,
    /** whether search should be considered enabled (for React Query, etc.) */
    isActive,
    /** onChange handler for convenience */
    handleChange,
    /** reset input to empty string */
    reset,
  } as const;
};
