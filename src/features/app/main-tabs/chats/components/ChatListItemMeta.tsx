type ChatListItemMetaProps = {
  name: string;
  messageTime: string | null;
};

export const ChatListItemMeta = ({
  name,
  messageTime,
}: ChatListItemMetaProps) => {
  return (
    <div className="flex items-start justify-between gap-2">
      <p className="truncate text-sm font-semibold text-primary-dark">{name}</p>
      {messageTime && (
        <span className="shrink-0 text-[11px] text-muted-foreground">
          {messageTime}
        </span>
      )}
    </div>
  );
};
