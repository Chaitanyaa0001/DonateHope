import { Request, Response } from "express";
import User from "../../models/user.model.js";
import Monitor from "../../models/monitor.model.js";
import redis from "../../config/redisClient.js";


const CACHE_TTL = 60; 


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if(!req.user){
      return res.status(401).json({ message: "Unauthorized admin get all users " });
    }
    const cacheKey = "users:all";
    const cachedUsers = await redis.get(cacheKey);

    if (cachedUsers) {
      return res.status(200).json(JSON.parse(cachedUsers));
    };

    const users = await User.find().select("email fullname role isVerified createdAt");
    await redis.set(cacheKey, JSON.stringify({ users }), "EX", CACHE_TTL);

    return res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    };

    const { id } = req.params;
    const cacheKey = `user:${id}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("User served from Redis");
      return res.status(200).json(JSON.parse(cached));
    }

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const monitors = await Monitor.find({ user: id }).select("name endpoint method interval uptime latency score createdAt");
    const data = { user, monitors };
    await redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL);
    return res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cacheKey = `user:${userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("Current user served from Redis");
      return res.status(200).json(JSON.parse(cached));
    }

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const monitors = await Monitor.find({ user: userId }).select(
      "name endpoint method interval uptime latency score createdAt"
    );
    const data = { user, monitors };
    await redis.set(cacheKey, JSON.stringify(data), "EX", CACHE_TTL);
    return res.status(200).json(data);
  } catch (err) {
    console.error("❌ Error fetching current user:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUserByAdmin = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Access denied" });
    }

    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await Monitor.deleteMany({ user: id });

    const keys = await redis.keys(`session:${id}:*`);
    if (keys.length) await redis.del(...keys);
    await redis.del(`user:${id}`);
    await redis.del("users:all"); 

    await User.findByIdAndDelete(id);

    return res.status(200).json({ message: "User and all related data deleted" });
  } catch (err) {
    console.error("❌ Error deleting user by admin:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
