import { usePresenceStore } from "@/features/app/stores/presence.store";
import { LastSeenLabel } from "@/shared/components";

type ChatTabProps = {
  userId: string;
  onClose: () => void;
};

export const ChatTab = ({ userId, onClose }: ChatTabProps) => {
  const presence = usePresenceStore((state) => state.presences[userId]);

  return (
    <div className="w-full h-full bg-linear-to-br from-light via-primary-light to-light p-10 ">
      <header className="flex items-center justify-between border-b border-gray-light bg-primary-dark/90 px-4 py-3">
        <div className="flex flex-col">
          <h2 className="font-semibold text-light">Chat</h2>
          <LastSeenLabel
            presence={presence}
            className="mt-0.5 text-primary-light text-xs"
          />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-primary-light/40 text-light hover:bg-primary-light/15 hover:text-primary-light"
          aria-label="Close chat"
        >
          ✕
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 text-sm text-muted-foreground">
        <p className="rounded-lg bg-light px-3 py-2 text-primary-dark shadow-sm">
          لا ياسطا عشان الثغرة الي كانوا بيتكلموا عليها موجوده في الاندرويد
          القديم واي اندرويد تحت ١٣ بيتعمله روت وبينزل عليه برامج تهكير وبعدين
          الي بيقول كل ٣ سنين هشتري موبايل هي اندرويد بتنزل نسخة كل سنه اصلا
          ومين قال انه لازم يكون الاندرويد اخر ٣ اصدارات بس هو بس عشان اي
          اندرويد تحت ١٣ كان حمايته ضعيفه: {userId}
        </p>
      </div>
    </div>
  );
};
