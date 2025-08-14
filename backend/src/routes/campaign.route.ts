import { Router } from "express";
import { getAllCampaigns, getMyCampaigns, postCampaign, deleteCampaign, editCampaign } from '../controllers/campaign.controller.ts';
import { verifyToken } from '../middleware/auth.middleware.ts';
import upload from "../middleware/multer.ts";

const router = Router();

router.get('/', getAllCampaigns);
router.post('/', verifyToken, upload.single("image"), postCampaign);

// "my campaigns" should be a dedicated path, not "/:id"
router.get('/me', verifyToken, getMyCampaigns);

// single campaign by id (optional, if you need it)
// router.get('/:id', getCampaignById);

router.put('/:id', verifyToken, editCampaign);
router.delete('/:id', verifyToken, deleteCampaign);

export default router;
