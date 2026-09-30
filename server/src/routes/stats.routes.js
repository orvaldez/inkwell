// server/src/routes/stats.routes.js
import { Router } from "express";
import { StatsService } from "../events/listeners/stats.listener.js";

const router = Router();

router.get("/stats", (req, res) => {
  res.status(200).json(StatsService.getStats());
});

export default router;