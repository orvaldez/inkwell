// server/src/routes/post.routes.js
import { Router } from "express";
import { PostService } from "../services/post.service.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// POST /posts (Hardened per Workshop 15 Section 1.3)
router.post("/posts", requireAuth, async (req, res, next) => {
  try {
    // Never trust client-supplied identity fields — derive
    // authorId from the authenticated request, not the request body.
    const post = await PostService.publish({
      ...req.body,
      authorId: req.user.id, // set by requireAuth middleware from verified JWT
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

// GET /posts
router.get("/posts", async (req, res, next) => {
  try {
    const { page = 1, search } = req.query;
    const result = search
      ? await PostService.search({ query: search, page: Number(page) })
      : await PostService.listPublished({ page: Number(page) });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;