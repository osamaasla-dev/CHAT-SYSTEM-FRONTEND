import { Placeholder, type MainTabKey } from "../placeholders";

type MainSectionProps = {
  tab: MainTabKey;
};

export const MainSection = ({ tab }: MainSectionProps) => {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-secondary p-10 text-center text-primary-dark">
      <Placeholder tab={tab} />
    </section>
  );
};
