import * as RedisPkg from "ioredis";
import dotenv from "dotenv";
dotenv.config();

const Redis = (RedisPkg as any).default || (RedisPkg as any);

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  username: process.env.REDIS_USER,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("✅ Connected to Redis Cloud via TLS");
});

redis.on("error", (err: unknown) => {
  console.error("❌ Redis connection error:", err);
});

export default redis;
