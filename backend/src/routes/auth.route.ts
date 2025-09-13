import  express  from "express";
import { requestOTP } from "../controllers/auth/sendOtp.controller.js";
import { verifyOTP } from "../controllers/auth/verifyOtp.controller.js";
import { refreshAccessToken } from "../controllers/auth/refreshToken.controller.js";
import { logout } from "../controllers/auth/logout.controller.js";
const router = express.Router();

// routes 
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.get('/refresh-token', refreshAccessToken);
router.post('/logout', logout);



export default router;