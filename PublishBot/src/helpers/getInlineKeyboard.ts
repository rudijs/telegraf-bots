import { Markup } from "telegraf";

import { canPublish } from "./canPublish";
import type { Context } from "../types";

type Options = {
  hidePreview?: boolean;
};

const PreviewButton = Markup.button.callback("Preview", "preview");
const PublishButton = Markup.button.callback("Publish", "publish");
const CancelButton = Markup.button.callback("Cancel", "cancel");

export const getInlineKeyboard = (ctx: Context, options: Options = {}) => {
  const canPublishNow = canPublish(ctx);
  const { hidePreview } = options;

  if (hidePreview) {
    return Markup.inlineKeyboard([
      canPublishNow ? [PublishButton] : [],
      [CancelButton],
    ]);
  }

  return Markup.inlineKeyboard([
    [PreviewButton, CancelButton],
    canPublishNow ? [PublishButton] : [],
  ]);
};
