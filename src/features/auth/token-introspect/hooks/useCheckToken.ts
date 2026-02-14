import { useEffect } from "react";
import { useToken } from "./useToken";

export function useCheckToken() {
  const { mutate, isPending, error, isError, isSuccess } = useToken();

  useEffect(() => {
    mutate();
  }, [mutate]);
  return { isPending, error, isError, isSuccess };
}
