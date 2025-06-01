import type { InputMediaPhoto, InputMediaVideo } from "telegraf/types";
import { FmtString, join } from "telegraf/format";

import { groupMessages, getInlineKeyboard } from "../helpers";
import type { Context } from "../types";

const preview = async (ctx: Context) => {
  if (ctx.session.messages.length > 0) {
    const { photos, videos, text } = groupMessages(ctx.session.messages);

    const fullText = join(
      text.map((t) => new FmtString(t.text, t.entities)),
      "\n",
    );

    if (photos.length || videos.length) {
      const media = [
        ...videos.map<InputMediaVideo>((video) => ({
          type: "video",
          media: video.video.file_id,
          ...video,
        })),
        ...photos.map<InputMediaPhoto>((photo) => ({
          type: "photo",
          media: photo.photo[photo.photo.length - 1].file_id,
          ...photo,
        })),
      ];

      if (fullText.text) {
        media[media.length - 1].caption = fullText.text;
        media[media.length - 1].caption_entities = fullText.entities;
      }

      return ctx.replyWithMediaGroup(media);
    }

    return ctx.reply(fullText, getInlineKeyboard(ctx, { hidePreview: true }));
  }

  return ctx.reply("No messages to preview.");
};

export default preview;
