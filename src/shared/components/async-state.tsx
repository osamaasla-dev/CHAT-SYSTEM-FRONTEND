import type { SpinnerLayerProps } from "./SpinnerLayer";
import { SpinnerLayer } from "./SpinnerLayer";
import { cn } from "@/shared/utils";

interface BaseStateProps {
  className?: string;
  children?: React.ReactNode;
}

interface LoadingStateProps extends BaseStateProps {
  label?: string;
  scope?: SpinnerLayerProps["scope"];
}

interface MessageStateProps extends BaseStateProps {
  message: string;
}

export const LoadingState = ({
  className,
  label,
  scope = "parent",
}: LoadingStateProps) => (
  <div
    className={cn(
      "relative flex flex-1 items-center justify-center",
      className,
    )}
  >
    <SpinnerLayer scope={scope} />
    {label ? (
      <span className="absolute mt-24 text-sm text-muted-foreground">
        {label}
      </span>
    ) : null}
  </div>
);

export const ErrorState = ({
  message,
  className,
  children,
}: MessageStateProps) => (
  <div
    className={cn(
      "flex flex-1 flex-col items-center justify-center  gap-3 h-screen rounded-2xl bg-primary-light px-6 py-8 text-center text-md text-danger font-medium",
      className,
    )}
  >
    <p className="bg-light p-10 rounded-xl">{message}</p>
    {children}
  </div>
);

export const EmptyState = ({
  message,
  className,
  children,
}: MessageStateProps) => (
  <div
    className={cn(
      "flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-secondary px-6 py-8 text-center text-sm text-muted-foreground",
      className,
    )}
  >
    <p>{message}</p>
    {children}
  </div>
);
