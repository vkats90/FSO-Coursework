const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
  let blogs = [];

  let result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});
