import express from "express";

const router = express.Router();

import { getAllMonitors, deleteMonitorById } from "../controllers/monitor/adminMonitor.controller.js";
import { getUserMonitors, analyzerMonitor } from "../controllers/monitor/userMonitor.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { postMonitor } from "../controllers/monitor/userMonitor.controller.js";
import upload from "../middleware/multer.js";

router.post("/", verifyToken,upload.single("file"), postMonitor);
router.get("/", verifyToken, getAllMonitors);
router.get("/user", verifyToken, getUserMonitors);
router.get("/analyze/:id", verifyToken, analyzerMonitor);
router.delete("/:id", verifyToken, deleteMonitorById);

export default router;