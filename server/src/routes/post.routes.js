// server/src/routes/post.routes.js
import { Router } from "express";
import { PostService } from "../services/post.service.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// POST /posts (Hardened per Workshop 15 Section 1.3)
router.post("/posts", requireAuth, async (req, res, next) => {
  try {
    const post = await PostService.publish({
      ...req.body,
      authorId: req.user.id, // derived from verified JWT
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// GET /posts (Hardened against DoS per Workshop 15 Exercise 1)
const MAX_PAGE_SIZE = 50;
const DEFAULT_PAGE_SIZE = 10;

router.get("/posts", async (req, res, next) => {
  try {
    const { page = 1, search } = req.query;

    // Parse and clamp pageSize to prevent DoS via giant database queries
    let parsedPageSize = parseInt(req.query.pageSize, 10);
    if (isNaN(parsedPageSize) || parsedPageSize < 1) {
      parsedPageSize = DEFAULT_PAGE_SIZE;
    } else if (parsedPageSize > MAX_PAGE_SIZE) {
      parsedPageSize = MAX_PAGE_SIZE;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);

    const result = search
      ? await PostService.search({ query: search, page: pageNum, pageSize: parsedPageSize })
      : await PostService.listPublished({ page: pageNum, pageSize: parsedPageSize });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// DELETE /posts/:id (Workshop 16 Section 1.2 - A01: Broken Access Control Fix)
router.delete("/posts/:id", requireAuth, async (req, res, next) => {
  try {
    const post = await PostService.getById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: { code: "NOT_FOUND" } });
    }

    // A01's fix: check that the logged-in user actually owns this resource
    if (post.authorId !== req.user.id) {
      return res.status(403).json({ error: { code: "FORBIDDEN" } });
    }

    await PostService.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default router;