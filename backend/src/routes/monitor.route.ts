// src/routes/monitor.routes.ts
import express from "express";
import {
  createMonitor,
  getUserMonitors,
  getAllMonitors,
  getMonitorById,
  updateMonitor,
  deleteMonitor,
} from "../controllers/monitor/monitor.controller.js";

import { verifyToken } from "../middleware/auth.middleware.js";
import { aurthorize } from "../middleware/authorize.middleware.js";


const router = express.Router();

// User endpoints
router.post("/", verifyToken, createMonitor);
router.get("/me", verifyToken, getUserMonitors);
router.get("/:id", verifyToken, getMonitorById);
router.put("/:id", verifyToken, updateMonitor);
router.delete("/:id", verifyToken, deleteMonitor);


router.get("/", verifyToken, aurthorize(["admin"]), getAllMonitors);

export default router;
