import dotenv from "dotenv";
import { session, Telegraf, type SessionStore } from "telegraf";
import { Session } from "./types";
// import { Telegraf } from "telegraf";
import { getDefaultSession, groupMessages } from "./helpers";
import type { Context } from "./types";

import { message } from "telegraf/filters";
import { hi, preview, publish, cancel } from "./commands";

dotenv.config();

if (!process.env.BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!');
// if (!process.env.WEBHOOK_DOMAIN) throw new Error('"WEBHOOK_DOMAIN" env var is required!');

const storage = new Map<string, string>();

const store: SessionStore<Session> = {
  get(key) {
    const value = storage.get(key);
    return value ? JSON.parse(value) : null;
  },

  set(key, value) {
    storage.set(key, JSON.stringify(value));
  },

  delete(key) {
    storage.delete(key);
  },
};

const hiRegExp = /^(hi|hello)$/i;
const previewRegExp = /^(preview|status)$/i;
const publishRegExp = /^(publish|send)$/i;
const cancelRegExp = /^(cancel|clear|delete)$/i;

// const bot = new Telegraf(process.env.BOT_TOKEN!);
const bot = new Telegraf<Context>(process.env.BOT_TOKEN!);

bot.use(
  session({
    defaultSession: getDefaultSession,
    store,
  }),
);

bot.start(hi);

bot.hears(hiRegExp, hi);
bot.command(hiRegExp, hi);
bot.action(hiRegExp, hi);

bot.hears(previewRegExp, preview);
bot.command(previewRegExp, preview);
bot.action(previewRegExp, async (ctx) => {
  await ctx.answerCbQuery();
  await preview(ctx);
});

bot.hears(cancelRegExp, cancel);
bot.command(cancelRegExp, cancel);
bot.action(cancelRegExp, async (ctx) => {
  await ctx.answerCbQuery();
  await cancel(ctx);
});

bot.hears(publishRegExp, publish);
bot.command(publishRegExp, publish);
bot.action(publishRegExp, async (ctx) => {
  await ctx.answerCbQuery();
  await publish(ctx);
});

bot.on(message("text"), async (ctx) => {
  ctx.session.messages.push({ text: ctx.message });
});

bot.on(message("photo"), async (ctx) => {
  ctx.session.messages.push({ photo: ctx.message });
});

bot.on(message("video"), async (ctx) => {
  ctx.session.messages.push({ video: ctx.message });
});

bot.launch(() => console.log("Bot is running.."));
