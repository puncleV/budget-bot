import { Telegraf } from "telegraf";

import { BudgetRepository } from "./budget-repository";
import { parseMessageText } from "./helpers";
import { AppContext } from "./types";

const token: string | undefined = process.env.BOT_TOKEN;

if (typeof token !== "string") {
  throw new Error("Nah, token is weird");
}

// todo typedi
const budgetRepository = new BudgetRepository();

const main = async () => {
  const bot = new Telegraf<AppContext>(token);

  bot.start(async (ctx) => {
    const chat = await ctx.getChat();

    budgetRepository.createIfNotExists(chat.id);

    await ctx.reply("Your budget: 0");
  });

  bot.help((ctx) => ctx.reply("to be implemented"));

  bot.use(async (ctx, next) => {
    const [command, message] = parseMessageText(ctx.message?.text);

    ctx.app = {
      message,
      command,
      budgetRepository,
      clientId: (await ctx.getChat()).id,
    };

    await next();
  });

  bot.command("add", (ctx) => {
    const budget = ctx.app.budgetRepository.get(ctx.app.clientId);

    ctx.app.budgetRepository.save(ctx.app.clientId, budget + parseInt(ctx.app.message, 10));

    ctx.reply("New Budget: " + ctx.app.budgetRepository.get(ctx.app.clientId));
  });

  bot.command("sub", (ctx) => {
    const budget = ctx.app.budgetRepository.get(ctx.app.clientId);

    ctx.app.budgetRepository.save(ctx.app.clientId, budget - parseInt(ctx.app.message, 10));

    ctx.reply("New Budget: " + ctx.app.budgetRepository.get(ctx.app.clientId));
  });

  bot.command("refresh", (ctx) => {
    ctx.app.budgetRepository.save(ctx.app.clientId, 0);

    ctx.reply("New Budget: " + ctx.app.budgetRepository.get(ctx.app.clientId));
  });

  bot.command("current", (ctx) => {
    ctx.reply("New Budget: " + ctx.app.budgetRepository.get(ctx.app.clientId));
  });

  await bot.launch();

  console.log("started");
};

main();
