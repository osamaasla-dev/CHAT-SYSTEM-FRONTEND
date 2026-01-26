import type { FieldError } from "react-hook-form";

export const renderFormErrors = (fieldErrors?: FieldError) => {
  if (!fieldErrors) {
    return null;
  }

  const messages = fieldErrors.types
    ? Object.values(fieldErrors.types).flatMap((value) =>
        Array.isArray(value) ? value : [value],
      )
    : fieldErrors.message
      ? [fieldErrors.message]
      : [];

  if (messages.length === 0) {
    return null;
  }

  return (
    <ul className="mt-2 space-y-1 text-sm text-danger">
      {messages.map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
};
