import { integer, word, words } from "casual";

import { parseMessageText } from "../src/helpers";

describe("parseMessage", () => {
  it("should return command and message separately", () => {
    const command = word;
    const message = words(integer(1, 10));

    const parsed = parseMessageText(`${command} ${message}`);

    expect(parsed).toStrictEqual([command, message]);
  });
});
