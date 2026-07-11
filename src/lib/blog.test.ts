import { describe, it, expect } from "vitest";
import { getAllPosts, getPost } from "./blog";

describe("blog lib", () => {
  it("lists at least the sample post with required meta", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThan(0);
    const sample = posts.find((p) => p.slug === "hello-rag");
    expect(sample?.title).toBeTruthy();
    expect(sample?.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("returns content for a known slug and null for unknown", () => {
    expect(getPost("hello-rag")?.content).toContain("Retrieval");
    expect(getPost("does-not-exist")).toBeNull();
  });
});
