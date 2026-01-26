import type { ComponentType } from "react";
import {
  SignupPage,
  VerifyEmailPage,
  LoginPage,
  MfaPage,
  ResetPasswordPage,
  ResetPasswordInfoPage,
} from "./features/auth";
import { AppPage } from "./features/app";

export interface RouteContent {
  key: string;
  index?: boolean;
  path?: string;
  Element: ComponentType;
  children?: RouteContent[];
}

export const routes: RouteContent[] = [
  {
    key: "/",
    path: "/",
    Element: AppPage,
  },
  {
    key: "/signup",
    path: "/signup",
    Element: SignupPage,
  },
  {
    key: "/email/verify",
    path: "/email/verify",
    Element: VerifyEmailPage,
  },
  {
    key: "/login",
    path: "/login",
    Element: LoginPage,
  },
  {
    key: "/mfa",
    path: "/mfa",
    Element: MfaPage,
  },
  {
    key: "/password/reset",
    path: "/password/reset",
    Element: ResetPasswordPage,
  },
  {
    key: "/password/reset/info",
    path: "/password/reset/info",
    Element: ResetPasswordInfoPage,
  },
];
