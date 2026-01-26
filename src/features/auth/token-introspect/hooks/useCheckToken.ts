import { useEffect } from "react";
import { useToken } from "./useToken";

export function useCheckToken() {
  const { mutate, isPending, isError, isSuccess } = useToken();

  useEffect(() => {
    mutate();
  }, [mutate]);
  return { isPending, isError, isSuccess };
}
