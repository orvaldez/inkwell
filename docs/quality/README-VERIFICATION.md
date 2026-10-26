# docs/quality/README-VERIFICATION.md

## README Verification — Lecture 14

Performed on this checkout, following README.md exactly, step by step, with no undocumented prior knowledge assumed[cite: 33]:

- [x] `git clone` + steps in "Getting Started" produce a running server[cite: 33]
- [x] `git clone` + steps in "Getting Started" produce a running client[cite: 33]
- [x] Every environment variable the app actually requires is documented[cite: 33]
- [x] Every command shown in the README actually runs without modification[cite: 33]

Result: 1 gap found larger than this section's own example above[cite: 33].

README.md had no "Getting Started" section at all: no clone instructions, no npm install, no Docker/Postgres setup, no DATABASE_URL format, no run commands, and no test commands[cite: 33]. A genuine newcomer could not have gotten the app running from README.md alone at any point through Lecture 13[cite: 33]. Fixed by adding a full "Getting Started" section: prerequisites, database setup (including the `docker start` vs `docker run` distinction from Lecture 8), server setup, client setup, and how to run all three test suites (including the separate `inkwell_test` database from Lecture 13)