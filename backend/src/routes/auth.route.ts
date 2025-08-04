import  express  from "express";
import { requestOTP } from "../controllers/auth/sendOtp.controller";
import { verifyOTP } from "../controllers/auth/verifyOtp.controller";
import { refreshAccessToken } from "../controllers/auth/refreshToken.controller";
const router = express.Router();

router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);
router.get('/refresh-token', refreshAccessToken);



export default router;