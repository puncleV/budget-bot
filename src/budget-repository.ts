export class BudgetRepository {
  private store = new Map<number, number>();

  createIfNotExists(id: number) {
    this.store.set(id, 0);
  }

  get(id: number) {
    return this.store.get(id) as number;
  }

  save(id: number, spent: number) {
    return this.store.set(id, spent);
  }

  delete(id: number) {
    return this.store.delete(id);
  }
}
