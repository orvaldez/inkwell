// server/src/events/listeners/stats.listener.js
import { EventBus } from "../event-bus.js";

let totalPublishedPosts = 0;

EventBus.on("post.published", () => {
  totalPublishedPosts += 1;
});

export const StatsService = {
  getStats() {
    return { totalPublishedPosts };
  },
};