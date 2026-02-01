import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useSettingsNavigation } from "../hooks-ui";
import { routeTitles, screensMap, slideVariants } from "../constants";

export const SettingsTab = () => {
  const { currentRoute, direction, canGoBack, pop, push, stack } =
    useSettingsNavigation();
  const CurrentScreen = useMemo(() => screensMap[currentRoute], [currentRoute]);

  return (
    <div className="relative h-full w-full overflow-x-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentRoute}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="flex h-full flex-col gap-4 "
        >
          <header className="flex items-center gap-1">
            {canGoBack && (
              <button
                type="button"
                onClick={pop}
                className="cursor-pointer rounded-full hover:bg-secondary p-2"
              >
                <ArrowLeft className="size-5" />
              </button>
            )}

            <p className="text-xl text-primary">{routeTitles[currentRoute]}</p>
          </header>

          <div className="mt-7 flex-1 overflow-auto border-t border-gray-light pt-2">
            <CurrentScreen push={push} pop={pop} stack={stack} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
