import { Link, useSearchParams } from "react-router-dom";
import { verifyEmailMessages } from "../messages";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const cardClass =
  "max-w-lg w-full rounded-3xl border border-light/70 bg-light p-10 text-center shadow-xl";

export function VerifyEmailStatus() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const message =
    verifyEmailMessages[status as keyof typeof verifyEmailMessages] ??
    verifyEmailMessages.SESSION_ERROR;

  useEffect(() => {
    if (!status) return;
    if (status === "SUCCESS") {
      navigate("/login", { replace: true });
    }
  }, [status, navigate]);
  return (
    <section className="flex  min-h-screen items-center justify-center bg-secondary px-4 py-16">
      {status === "SUCCESS" ? (
        <Loader2 className="animate-spin text-primary" size={100} />
      ) : (
        <div className={cardClass}>
          <div className="space-y-6" aria-live="polite">
            <div className="space-y-4" role="status" aria-live="assertive">
              <h2 className="text-2xl font-bold text-danger">
                Email Verification failed
              </h2>
              <p className=" font-medium text-muted-foreground">{message}</p>
              <Link to="/signup" className="text-primary-dark hover:underline ">
                {"Go to Signup ->"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
