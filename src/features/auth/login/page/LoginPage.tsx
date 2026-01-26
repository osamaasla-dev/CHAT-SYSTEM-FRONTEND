import { LoginLayout } from "../components/LoginLayout";
import { useCheckToken } from "../../token-introspect/hooks";
import { SpinnerLayer } from "@/shared/components";

export const LoginPage = () => {
  const { isPending, isError } = useCheckToken();

  return isPending ? <SpinnerLayer /> : isError && <LoginLayout />;
};
