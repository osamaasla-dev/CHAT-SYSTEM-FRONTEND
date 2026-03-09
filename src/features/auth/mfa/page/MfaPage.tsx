import { useLocation } from "react-router-dom";
import { MfaLayout } from "../components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SpinnerLayer } from "@/shared/components";

export const MfaPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state?.fromLogin) {
      navigate("/login", { replace: true });
    }
  }, [location, navigate]);
  return location.state?.fromLogin ? <MfaLayout /> : <SpinnerLayer />;
};
