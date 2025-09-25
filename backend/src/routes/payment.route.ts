import  express  from "express";

const router = express.Router();

import {createorder,getpaymentHistory,verifyPayment} from "../controllers/payment/Donation.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { aurthorize } from "../middleware/authorize.middleware.js";

router.post("/",verifyToken,aurthorize,createorder);
router.post("/verify",verifyToken,aurthorize ,verifyPayment);
router.get("/payment-history", verifyToken ,getpaymentHistory )

export default router;
