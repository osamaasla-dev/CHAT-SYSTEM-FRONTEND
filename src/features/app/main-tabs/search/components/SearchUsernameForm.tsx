import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button, Input } from "@/shared/components";
import { renderFormErrors } from "@/shared/utils";
import {
  searchUsernameSchema,
  type SearchUsernameSchema,
} from "../schemas/search-user.schema";

type SearchUsernameFormProps = {
  onSearch: (username: string) => void;
  isSearching: boolean;
};

export const SearchUsernameForm = ({
  onSearch,
  isSearching,
}: SearchUsernameFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SearchUsernameSchema>({
    resolver: zodResolver(searchUsernameSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    defaultValues: {
      username: "",
    },
  });

  const handleFormSubmit = handleSubmit(({ username }) => {
    onSearch(username);
  });

  const handleReset = () => {
    reset();
    onSearch("");
  };

  return (
    <form className="space-y-3" onSubmit={handleFormSubmit}>
      <label className="space-y-2" htmlFor="username">
        <span className="text-sm font-medium text-primary">Username</span>
        <div className="flex gap-2">
          <Input
            id="username"
            enableValidationStyles={true}
            isValid={isValid}
            placeholder="username"
            autoComplete="off"
            aria-invalid={errors.username ? "true" : "false"}
            {...register("username")}
          />
          <Button
            type="submit"
            variant="submit"
            disabled={isSubmitting || isSearching}
          >
            <Search className="size-4" />
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Clear
          </Button>
        </div>
        {renderFormErrors(errors.username)}
      </label>
    </form>
  );
};
