import { Context } from "telegraf";

export const getMessageTextWithoutPrefix = (ctx: Context, prefix: string): string =>
  ctx.message?.text?.replace(new RegExp(`^/${prefix}`), "") || "";
