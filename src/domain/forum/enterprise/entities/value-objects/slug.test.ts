import { test, expect } from "vitest";
import { Slug } from "./slug.ts";

test("Test slug creation", async () => {
  const slug = Slug.createFromText("Testea8----88324200-__mmNHNUW:::");

  expect(slug.value).toBe("testea8-88324200-mmnhnuw");
});
