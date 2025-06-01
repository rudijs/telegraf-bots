import { fmt } from "telegraf/format";

import { Context } from "../types";

const hi = async (ctx: Context) => {
  await ctx.reply(fmt`
        Hello! Welcome to Publish Bot. I can help you publish your content to multiple channels at once.

    1. Write a message or send a photo/video.
    2. Check the preview of the message.
    3. If everything looks good, publish it to the channels.
`);
};

export default hi;
