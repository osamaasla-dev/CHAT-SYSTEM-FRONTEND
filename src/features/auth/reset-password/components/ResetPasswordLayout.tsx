import { useSearchParams } from "react-router-dom";
import { ResetPasswordFormCard } from "./ResetPasswordFormCard";

export const ResetPasswordLayout = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  return (
    <main
      data-testid="reset-password-layout"
      className="flex min-h-screen flex-col overflow-hidden bg-secondary px-6 py-10"
      aria-label="Reset password"
      role="main"
    >
      <div className="mx-auto flex h-full w-full max-w-4xl items-center justify-center px-2">
        <div className="w-full max-w-xl">
          <ResetPasswordFormCard token={token} />
        </div>
      </div>
    </main>
  );
};
