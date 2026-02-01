import { useCallback, useMemo, useState } from "react";

import type { SettingsRoute, SettingsStack } from "../types";
import type { Direction } from "../constants";

const INITIAL_STACK: SettingsStack = ["home"];

export const useSettingsNavigation = () => {
  const [stack, setStack] = useState<SettingsStack>(INITIAL_STACK);
  const [direction, setDirection] = useState<Direction>(1);

  const push = useCallback((route: SettingsRoute) => {
    setDirection(1);
    setStack((prev) => [...prev, route]);
  }, []);

  const pop = useCallback(() => {
    setStack((prev) => {
      if (prev.length <= 1) {
        return prev;
      }
      setDirection(-1);
      return prev.slice(0, -1);
    });
  }, []);

  const currentRoute = useMemo(() => stack[stack.length - 1], [stack]);
  const canGoBack = stack.length > 1;

  return {
    stack,
    push,
    pop,
    currentRoute,
    canGoBack,
    direction,
  };
};
