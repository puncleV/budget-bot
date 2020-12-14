import { Telegraf } from "telegraf";

import { getMessageTextWithoutPrefix } from "./helpers";

const token: string | undefined = process.env.BOT_TOKEN;

if (typeof token !== "string") {
  throw new Error("Nah, token is weird");
}
const main = async () => {
  const bot = new Telegraf(token);

  bot.start((ctx) => ctx.reply("ggg"));
  bot.help((ctx) => ctx.reply("to be implemented"));

  bot.command("add", (ctx) => ctx.reply("added: " + getMessageTextWithoutPrefix(ctx, "add")));
  bot.command("sub", (ctx) => ctx.reply("added: " + getMessageTextWithoutPrefix(ctx, "sub")));
  bot.command("refresh", (ctx) => ctx.reply("added: " + getMessageTextWithoutPrefix(ctx, "refresh")));

  await bot.launch();

  console.log("started");
};

main();
