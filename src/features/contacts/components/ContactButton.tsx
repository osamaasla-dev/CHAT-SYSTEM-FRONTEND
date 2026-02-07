import { useIsMutating } from "@tanstack/react-query";

import { Button } from "@/shared/components";
import { useCreateContact, CREATE_CONTACT_MUTATION_KEY } from "../hooks/useCreateContact";
import { useDeleteContact, DELETE_CONTACT_MUTATION_KEY } from "../hooks/useDeleteContact";

type ContactButtonProps = {
  contactId: string;
  isInContacts: boolean;
};

export const ContactButton = ({ contactId, isInContacts }: ContactButtonProps) => {
  const { mutate: addContact } = useCreateContact(contactId);
  const { mutate: removeContact } = useDeleteContact(contactId);

  const isCreating =
    useIsMutating({ mutationKey: CREATE_CONTACT_MUTATION_KEY(contactId) }) > 0;
  const isDeleting =
    useIsMutating({ mutationKey: DELETE_CONTACT_MUTATION_KEY(contactId) }) > 0;

  const isMutatingForUser = isCreating || isDeleting;

  const handleClick = () => {
    if (isMutatingForUser) return;

    if (isInContacts) {
      removeContact();
    } else {
      addContact();
    }
  };

  const label = isInContacts ? "Remove from contacts" : "Add to contacts";

  return (
    <Button
      variant="submit"
      size="sm"
      className="h-fit p-1 text-sm font-normal"
      type="button"
      disabled={isMutatingForUser}
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};
