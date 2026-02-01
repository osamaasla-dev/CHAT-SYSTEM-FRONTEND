import { Loader2 } from "lucide-react";

type SpinnerLayerScope = "screen" | "parent";

export interface SpinnerLayerProps {
  scope?: SpinnerLayerScope;
  className?: string;
}

export function SpinnerLayer({
  scope = "screen",
  className,
}: SpinnerLayerProps) {
  const positionClass =
    scope === "screen" ? "fixed inset-0" : "absolute inset-0 rounded-[inherit]";

  return (
    <div
      className={`${positionClass} z-50 bg-primary-light/50 flex items-center justify-center ${className}`}
    >
      <Loader2 className=" animate-spin text-primary" size={50} />
    </div>
  );
}
