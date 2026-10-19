// server/src/services/post.service.js
import { PostRepository } from "../repositories/post.repository.js";
import { assertNonEmpty } from "../utils/validation.js";
import { SubstringSearchStrategy } from "./search/substring-search.strategy.js";
import { EventBus } from "../events/event-bus.js";

const searchStrategy = SubstringSearchStrategy;

export const PostService = {
  async publish({ authorId, title, body, tagNames = [] }) {
    assertNonEmpty(title, "title", "MISSING_TITLE");
    assertNonEmpty(body, "body", "MISSING_BODY");

    const post = await PostRepository.createWithTags({
      authorId,
      title,
      body,
      tagNames,
      status: "PUBLISHED",
      publishedAt: new Date(),
    });

    EventBus.emit("post.published", {
      postId: post.id,
      authorId,
      title: post.title,
      tags: tagNames,
    });

    return post;
  },

  async listPublished({ page = 1, pageSize = 10 }) {
    const { posts, hasMore } = await PostRepository.findPublished({
      page,
      pageSize,
    });
    return { posts, page, hasMore };
  },

  async search(query, options = {}) {
    // Normalizes query input (handles string or object wrapper { query, page, pageSize })
    const term = typeof query === "object" && query !== null ? query.query : query;
    const { page = 1, pageSize = 10 } = typeof query === "object" && query !== null ? query : options;

    if (!term || typeof term !== "string" || term.trim() === "") {
      return [];
    }

    return searchStrategy.search(term, { page, pageSize });
  },
};