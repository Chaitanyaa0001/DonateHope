import  express  from "express";
import { adminLogin, verifyAdminOTP } from "../controllers/admin/admin.controller";
const router = express.Router();

// import { verifyToken } from "../middleware/auth.middleware.js";

router.post('/admin-login', adminLogin);
router.post('/verify-admin-otp',verifyAdminOTP);






export default router;
