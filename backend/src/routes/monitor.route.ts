import express from "express";

const router = express.Router();

import { getUserMonitors,getUserMonitorLogs, getMonitorById, deleteMonitor, getLogsByMonitorId,  } from "../controllers/monitor/userMonitor.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { postMonitor } from "../controllers/monitor/userMonitor.controller.js";
import upload from "../middleware/multer.js";
import {deleteMonitorByAdmin}  from '../controllers/monitor/adminMonitor.controller.js' 
import { aurthorize } from "../middleware/authorize.middleware.js";


router.post("/", verifyToken,upload.single("file"), postMonitor);
router.get("/", verifyToken, getUserMonitors);
router.get("/logs", verifyToken, getUserMonitorLogs); 
router.get("/:id", verifyToken,  getMonitorById);
router.get("/logs/:id", verifyToken,getLogsByMonitorId);

router.delete("/:id", verifyToken,  deleteMonitor);
// admin 
router.delete("/admin/:id", verifyToken,aurthorize(['admin']),deleteMonitorByAdmin);


export default router;