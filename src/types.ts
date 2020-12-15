import { Context } from "telegraf";

import { BudgetRepository } from "./budget-repository";

export interface AppContext extends Context {
  app: {
    message: string;
    command: string;
    budgetRepository: BudgetRepository;
    clientId: number;
  };
}
