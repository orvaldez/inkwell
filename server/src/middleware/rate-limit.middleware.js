// server/src/middleware/rate-limit.middleware.js
import rateLimit from "express-rate-limit";

// Disable or increase limits during automated test runs
const isTest = process.env.NODE_ENV === "test";

export const authRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: isTest ? 1000 : 5, // generous limit during test runs, strict in production
  skip: () => isTest, // skip rate limiting completely during test runs
  message: {
    error: {
      code: "TOO_MANY_ATTEMPTS",
      message: "Too many attempts. Try again later.",
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});