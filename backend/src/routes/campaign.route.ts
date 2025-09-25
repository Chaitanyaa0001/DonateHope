import { Router } from "express";
import { getAllCampaigns, getMyCampaigns, postCampaign, deleteCampaign, editCampaign, getCampaignById } from '../controllers/campaign.controller.ts';
import { verifyToken } from '../middleware/auth.middleware.ts';
import upload from "../middleware/multer.ts";
import { aurthorize } from "../middleware/authorize.middleware.ts";

const router = Router();

router.get('/', getAllCampaigns);
router.post('/', verifyToken, upload.single("image"), postCampaign);

router.get('/my', verifyToken, getMyCampaigns);

router.get('/:id', verifyToken ,getCampaignById);

router.put('/:id', verifyToken, editCampaign);
router.delete('/:id', verifyToken, deleteCampaign);

export default router;
