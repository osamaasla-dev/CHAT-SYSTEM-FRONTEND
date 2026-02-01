import { getSimpleConfig, type MainTabKey } from "./config";

type PlaceholderProps = {
  tab: MainTabKey;
};

export const Placeholder = ({ tab }: PlaceholderProps) => {
  const { icon: Icon, title } = getSimpleConfig(tab);

  return (
    <div className="flex flex-col items-center text-center text-primary-dark">
      <div className="mb-6 flex size-24 items-center justify-center rounded-full border-4 border-dashed border-primary/30 bg-white">
        <Icon className="size-12 text-primary" />
      </div>
      <h2 className="mb-2 text-4xl font-semibold">{title}</h2>
    </div>
  );
};
