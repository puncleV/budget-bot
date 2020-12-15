import { Telegraf } from "telegraf";

import { parseMessageText } from "./helpers";
import { AppContext } from "./types";

const token: string | undefined = process.env.BOT_TOKEN;

if (typeof token !== "string") {
  throw new Error("Nah, token is weird");
}

const main = async () => {
  const bot = new Telegraf<AppContext>(token);

  bot.start((ctx) => ctx.reply("ggg"));
  bot.help((ctx) => ctx.reply("to be implemented"));

  bot.use(async (ctx, next) => {
    const [command, message] = parseMessageText(ctx.message?.text);

    ctx.app = {
      message,
      command,
    };

    await next();
  });

  bot.command("add", (ctx) => ctx.reply("added: " + ctx.app.message));
  bot.command("sub", (ctx) => ctx.reply("added: " + ctx.app.message));
  bot.command("refresh", (ctx) => ctx.reply("added: " + ctx.app.message));

  await bot.launch();

  console.log("started");
};

main();
