import { Router } from "express";
import { getAllCampaigns, getMyCampaigns, postCampaign, deleteCampaign, editCampaign, getCampaignById } from '../controllers/campaign.controller.ts';
import { verifyToken } from '../middleware/auth.middleware.ts';
import upload from "../middleware/multer.ts";
import { aurthorize } from "../middleware/authorize.middleware.ts";

const router = Router();

// All users (donors/funders) can see all campaigns
router.get('/', verifyToken, getAllCampaigns);

// Funders only: create, edit, delete, and get their own campaigns
router.post('/', verifyToken, aurthorize(['funder']), upload.single("image"), postCampaign);
router.get('/my', verifyToken, aurthorize(['funder']), getMyCampaigns);
router.put('/:id', verifyToken, aurthorize(['funder']), editCampaign);
router.delete('/:id', verifyToken, aurthorize(['funder']), deleteCampaign);

// Any logged-in user can see a campaign by ID
router.get('/:id', verifyToken, getCampaignById);


export default router;
