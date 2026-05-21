import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Distributed sliding-window rate limiter backed by Upstash Redis.
 *
 * Activation is automatic: when both `UPSTASH_REDIS_REST_URL` and
 * `UPSTASH_REDIS_REST_TOKEN` are present in the environment, this module
 * exports a real `Ratelimit` instance. Otherwise it exports `null`, which
 * tells callers to fall back to their in-process limiter (suitable for local
 * development and zero-config previews).
 *
 * Limit policy: 3 requests per IP per rolling 60 s window — matches the
 * existing in-memory policy in `/api/contact`.
 */
export const upstashRatelimit: Ratelimit | null =
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
        ? new Ratelimit({
              redis: Redis.fromEnv(),
              limiter: Ratelimit.slidingWindow(3, "60 s"),
              analytics: true,
              prefix: "rl:contact",
          })
        : null;
