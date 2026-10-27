// server/src/routes/__tests__/posts.access-control.test.js
//
// Verification fix: this test calls createTestUser()/createTestPost()/
// tokenFor() and uses `app`/`request`/`prisma` — imports and test
// fixtures are loaded below.

import request from "supertest";
import { app } from "../../app.js";
import { prisma } from "../../db/client.js";
import {
  resetDatabase,
  createTestUser,
  createTestPost,
  tokenFor,
} from "../../test-utils/fixtures.js";

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

test("a user cannot delete another user's post (A01 regression test)", async () => {
  const owner = await createTestUser();
  const attacker = await createTestUser();
  const post = await createTestPost({ authorId: owner.id });

  const res = await request(app)
    .delete(`/api/posts/${post.id}`)
    .set("Authorization", `Bearer ${tokenFor(attacker)}`);

  expect(res.status).toBe(403);
});