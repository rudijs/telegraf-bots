import type { Context } from "../types";

const MINIMUM_TEXT_LENGTH = 10;

export const canPublish = (ctx: Context) => {
  const { messages } = ctx.session;

  const hasMedia = messages.some((message) => message.photo || message.video);
  const hasText = messages.some(
    (message) => message.text?.text.length ?? 0 > MINIMUM_TEXT_LENGTH,
  );

  return hasMedia || hasText;
};
