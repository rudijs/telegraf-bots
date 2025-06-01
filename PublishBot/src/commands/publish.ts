import { getDefaultSession, groupMessages } from "../helpers";
import type { Context } from "../types";

const publish = async (ctx: Context) => {
  if (ctx.session.messages.length > 0) {
    const { photos, videos, text } = groupMessages(ctx.session.messages);

    const draft = {
      author: ctx.from,
      photos,
      videos,
      text,
    };

    try {
      // Do something with the draft
      draft;
    } catch (e) {
      console.error(e);
      return ctx.reply(
        "There was an error while trying to publish your messages.",
      );
    }

    ctx.session = getDefaultSession();

    return ctx.reply("Your messages has been published.");
  }

  return ctx.reply("No messages to publish.");
};

export default publish;
