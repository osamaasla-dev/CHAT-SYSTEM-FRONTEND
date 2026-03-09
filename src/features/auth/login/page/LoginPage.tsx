import { LoginLayout } from "../components/LoginLayout";
import { useCheckToken } from "../../token-introspect/hooks";
import { SpinnerLayer } from "@/shared/components";

export const LoginPage = () => {
  const { isPending, isError } = useCheckToken();

  if (isPending) {
    return <SpinnerLayer />;
  }

  if (isError) {
    return <LoginLayout />;
  }

  return null;
};
