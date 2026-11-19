# Stress Test Results (Lecture 21)

**Date:** 2026-11-19
**Target:** inkwell-staging (Render free plan)
**Script:** load-tests/feed-stress.k6.js (20 → 100 → 300 → 0 VUs, 30s per stage)

## Results
- Total requests: 5,475 (about 45 req/s average)
- Failed requests: 1 (0.01%), a single "connection refused" during ramp-down
- Latency: median 700 ms, p90 4.49 s, p95 5 s, max 6.39 s
- Throughput leveled off at about 60–70 req/s from roughly 100 VUs onward,
  even as load climbed to 300 VUs

## Breaking point
The service did not crash or return errors, but it saturated at about
70–100 concurrent virtual users. Beyond that, extra load only increased
response time: p95 latency rose to 5 s, 10× over the 500 ms load-test goal.

## Likely bottleneck
The free Render instance's limited CPU and memory. Requests queue once the
single instance is fully busy, so latency grows while throughput stays flat.

## Notes
- Run against staging only, never production.
- The first stage includes Render's cold start if the service was asleep.
- Results depend on the test location and free-plan hardware.
