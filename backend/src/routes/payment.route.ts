import  express  from "express";

const router = express.Router();

import {createorder} from "../controllers/payment/Donation.controller.js";
import{verifyPayment} from "../controllers/payment/verification.controller.js"

router.post("/",createorder);
router.post("/verify", verifyPayment);

export default router;
