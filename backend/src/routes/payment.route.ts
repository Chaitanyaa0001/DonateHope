import  express  from "express";

const router = express.Router();

import {createorder,verifyPayment} from "../controllers/payment/Donation.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

router.post("/",verifyToken,createorder);
router.post("/verify",verifyToken, verifyPayment);

export default router;
