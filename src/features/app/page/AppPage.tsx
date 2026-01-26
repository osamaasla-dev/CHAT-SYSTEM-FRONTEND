import { useCheckToken } from "@/features/auth/token-introspect/hooks";
import { SpinnerLayer } from "@/shared/components";

export const AppPage = () => {
  const { isSuccess } = useCheckToken();

  return isSuccess ? (
    <div className="text-green-500 text-6xl">SUCCESS</div>
  ) : (
    <SpinnerLayer />
  );
};
