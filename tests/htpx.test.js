import htpx from "../src/index";

test("Should make a GET request", async () => {
  const res = await htpx.get("https://jsonplaceholder.typicode.com/posts/1");
  expect(res.data).toHaveProperty("id");
});

test("Should make a POST request", async () => {
  const res = await htpx.post("https://jsonplaceholder.typicode.com/posts", {
    title: "foo",
    body: "bar",
    userId: 1,
  });
  expect(res.data).toHaveProperty("id");
});

test("Should make a PUT request", async () => {
  const res = await htpx.put("https://jsonplaceholder.typicode.com/posts/1", {
    title: "updated title",
    body: "updated body",
    userId: 1,
  });
  expect(res.data).toHaveProperty("id");
});

test("Should make a DELETE request", async () => {
  const res = await htpx.delete("https://jsonplaceholder.typicode.com/posts/1");
  expect(JSON.stringify(res.data)).toBe("{}");
});

test("Should throw a timeout error", async () => {
  try {
    await htpx.get("https://jsonplaceholder.typicode.com/posts/1", {
      timeout: 1,
    });
  } catch (error) {
    expect(error.message).toBe("Timeout Error");
  }
});
