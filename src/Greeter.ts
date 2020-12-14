export class Greeter {
  private subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }

  public greeting(): string {
    return `Hello ${this.subject}!`;
  }
}
