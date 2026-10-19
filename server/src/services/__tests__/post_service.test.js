// server/src/services/__tests__/post.service.test.js

import { jest } from "@jest/globals";

const mockPostRepository = {
  createWithTags: jest.fn(),
  searchPublished: jest.fn(),
};

const mockEventBus = { emit: jest.fn() };

jest.unstable_mockModule("../../repositories/post.repository.js", () => ({
  PostRepository: mockPostRepository,
}));

jest.unstable_mockModule("../../events/event-bus.js", () => ({
  EventBus: mockEventBus,
}));

const { PostService } = await import("../post.service.js");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PostService.publish", () => {
  test("publish() creates a PUBLISHED post and emits post.published", async () => {
    mockPostRepository.createWithTags.mockResolvedValue({
      id: "p1",
      title: "Hello",
      status: "PUBLISHED",
    });

    const post = await PostService.publish({
      authorId: "u1",
      title: "Hello",
      body: "World",
    });

    expect(post.status).toBe("PUBLISHED");
    expect(mockEventBus.emit).toHaveBeenCalledWith(
      "post.published",
      expect.objectContaining({ postId: "p1" })
    );
  });

  test("publish() rejects an empty title", async () => {
    await expect(
      PostService.publish({ authorId: "u1", title: "", body: "World" })
    ).rejects.toThrow();
  });
});

describe("PostService.search (Workshop 12 Exercise 1)", () => {
  test("returns matching posts for a valid query string (row 1)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue([
      { id: "p1", title: "NodeJS Guide" },
    ]);

    const results = await PostService.search("NodeJS");
    expect(results).toHaveLength(1);
    expect(results[0].title).toBe("NodeJS Guide");
  });

  test("returns an empty array for an empty query string (row 2, boundary/empty)", async () => {
    const results = await PostService.search("");
    expect(results).toEqual([]);
  });

  test("returns an empty array for whitespace-only query (row 3, equivalence)", async () => {
    const results = await PostService.search("   ");
    expect(results).toEqual([]);
  });

  test("handles options and delegates pagination properly (row 4, white-box)", async () => {
    mockPostRepository.searchPublished.mockResolvedValue([]);

    const results = await PostService.search({
      query: "node",
      page: 2,
      pageSize: 5,
    });
    expect(mockPostRepository.searchPublished).toHaveBeenCalledWith({
      query: "node",
      page: 2,
      pageSize: 5,
    });
    expect(results).toEqual([]);
  });
});