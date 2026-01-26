import { Loader2 } from "lucide-react";

type SpinnerLayerScope = "screen" | "parent";

interface SpinnerLayerProps {
  scope?: SpinnerLayerScope;
}

export function SpinnerLayer({ scope = "screen" }: SpinnerLayerProps) {
  const positionClass =
    scope === "screen" ? "fixed inset-0" : "absolute inset-0 rounded-[inherit]";

  return (
    <div
      className={`${positionClass} z-50 bg-primary-light/50 flex items-center justify-center`}
    >
      <Loader2 className=" animate-spin text-primary" size={50} />
    </div>
  );
}
