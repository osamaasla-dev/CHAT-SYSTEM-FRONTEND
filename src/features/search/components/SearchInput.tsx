import type { ComponentPropsWithoutRef } from "react";

import { Input } from "@/shared/components";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  showSearchIcon?: boolean;
} & Omit<ComponentPropsWithoutRef<typeof Input>, "value" | "onChange" | "type">;

export const SearchInput = ({
  value,
  onChange,
  showSearchIcon = true,
  ...props
}: SearchInputProps) => {
  return (
    <Input
      type="search"
      enableValidationStyles={true}
      showSearchIcon={showSearchIcon}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      {...props}
    />
  );
};
