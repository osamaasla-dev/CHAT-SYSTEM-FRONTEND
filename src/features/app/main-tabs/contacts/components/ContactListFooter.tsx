type ContactListFooterProps = {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export const ContactListFooter = ({
  hasNextPage,
  isFetchingNextPage,
}: ContactListFooterProps) => {
  return (
    <>
      {hasNextPage ? (
        <p className="text-center text-xs text-muted-foreground">
          {isFetchingNextPage ? "Loading more..." : "Scroll to load more"}
        </p>
      ) : (
        <p className="text-center text-xs text-muted-foreground">
          You've reached the end of the list.
        </p>
      )}
    </>
  );
};
