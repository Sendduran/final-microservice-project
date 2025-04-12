const { add } = require("../../src/utils/math");

describe("add()", () => {
  it("addstwo numbers correctly", () => {
    expect(add(2, 3)).toBe(5);
  });
});
