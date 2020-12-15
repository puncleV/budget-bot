export const parseMessageText = (text?: string): string[] => {
  const [command, ...message] = text?.split(" ") || [];

  return [command, message.join(" ")];
};
