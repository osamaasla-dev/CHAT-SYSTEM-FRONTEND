import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/shared/utils";

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default";
}) {
  const trackSizes = {
    default: "h-6 w-10 px-1",
    sm: "h-4 w-7 px-0.5",
  } satisfies Record<typeof size, string>;

  const thumbSizes = {
    default: "h-4 w-4 data-[state=checked]:translate-x-[100%]",
    sm: "h-3 w-3 data-[state=checked]:translate-x-3",
  } satisfies Record<typeof size, string>;

  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "cursor-pointer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-muted-foreground/40 transition-colors focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground",
        trackSizes[size],
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-white shadow-sm transition-transform data-[state=unchecked]:translate-x-0",
          thumbSizes[size],
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
