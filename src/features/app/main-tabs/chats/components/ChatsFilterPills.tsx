import type { ChatListFilter } from "@/features/chats";

type FilterOption = {
  value: ChatListFilter;
  label: string;
};

type ChatsFilterPillsProps = {
  options: FilterOption[];
  activeFilter: ChatListFilter;
  onChange: (filter: ChatListFilter) => void;
};

export const ChatsFilterPills = ({
  options,
  activeFilter,
  onChange,
}: ChatsFilterPillsProps) => {
  return (
    <div className="flex items-center gap-2">
      {options.map((option) => {
        const isActiveFilter = option.value === activeFilter;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => {
              onChange(option.value);
            }}
            className={`cursor-pointer rounded-full border px-3 py-1.5 text-sm transition ${
              isActiveFilter
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-light bg-white text-primary-dark hover:bg-secondary"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

