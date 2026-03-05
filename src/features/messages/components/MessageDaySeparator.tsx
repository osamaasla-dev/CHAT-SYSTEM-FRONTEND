type MessageDaySeparatorProps = {
  label: string;
};

export const MessageDaySeparator = ({ label }: MessageDaySeparatorProps) => {
  if (!label) {
    return null;
  }

  return (
    <div className="sticky top-0 z-10 flex justify-center">
      <span className="rounded-full bg-light px-2.5 py-0.5 text-[10px] font-medium text-primary-dark shadow-sm backdrop-blur">
        {label}
      </span>
    </div>
  );
};
