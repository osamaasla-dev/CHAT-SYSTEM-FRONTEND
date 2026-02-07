import type { MainTabKey } from "@/features/app/types/main-tabs.types";
import { Placeholder } from "../placeholders";

type MainSectionProps = {
  tab: MainTabKey;
  className?: string;
};

export const MainSection = ({ tab, className }: MainSectionProps) => {
  return (
    <section
      className={`flex flex-col justify-center items-center bg-secondary p-10 text-center text-primary-dark ${className}`}
    >
      <Placeholder tab={tab} />
    </section>
  );
};
