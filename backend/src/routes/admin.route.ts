import  express  from "express";
import { adminLogin, verifyAdminOTP } from "../controllers/admin/admin.controller";
const router = express.Router();

// Add your admin routes here

router.post('/admin-login', adminLogin)
router.post('/verify-admin-otp',verifyAdminOTP)


export default router;
