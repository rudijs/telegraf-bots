import { getDefaultSession } from "../helpers";
import type { Context } from "../types";

const cancel = async (ctx: Context) => {
  await ctx.reply("Draft has been deleted. You can start over.");

  ctx.session = getDefaultSession();
};

export default cancel;
