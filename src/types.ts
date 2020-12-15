import { Context } from "telegraf";

export interface AppContext extends Context {
  app: {
    message: string;
    command: string;
  };
}
