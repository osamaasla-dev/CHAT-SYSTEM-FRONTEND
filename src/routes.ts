import type { ComponentType } from "react";
import {
  SignupPage,
  VerifyEmailPage,
  LoginPage,
  MfaPage,
  ResetPasswordPage,
  ResetPasswordInfoPage,
} from "./features/auth";
import { AppPage, ForcedDisconnectPage } from "./features/app";
import { Test } from "./Test";

export interface RouteContent {
  key: string;
  index?: boolean;
  path?: string;
  Element: ComponentType;
  children?: RouteContent[];
}

const developmentOnlyRoutes: RouteContent[] = import.meta.env.DEV
  ? [
      {
        key: "/test",
        path: "/test",
        Element: Test,
      },
    ]
  : [];

export const routes: RouteContent[] = [
  ...developmentOnlyRoutes,
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
  {
    key: "/forced-disconnect",
    path: "/forced-disconnect",
    Element: ForcedDisconnectPage,
  },
];
