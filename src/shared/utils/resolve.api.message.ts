type MessageDictionary = Record<string, string>;

export function resolveApiErrorMessage(
  rawMessage: string | string[],
  dictionary?: MessageDictionary,
): string {
  const applyDictionary = (message: string) => dictionary?.[message] ?? message;

  if (Array.isArray(rawMessage)) {
    return rawMessage.map(applyDictionary).join(", ");
  }

  return applyDictionary(rawMessage);
}
