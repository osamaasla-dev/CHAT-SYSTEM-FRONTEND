import { EmailForm } from "./EmailForm";
import { CurrentEmailCard } from "./CurrentEmailCard";
import { useEmailSettingsForm } from "../hooks";

export const EmailSettings = () => {
  const { currentEmail } = useEmailSettingsForm();

  return (
    <div className="space-y-6">
      <CurrentEmailCard email={currentEmail} />
      <EmailForm />
    </div>
  );
};
