import { Request, Response } from "express";
import campaignModel from "../models/campaign.model.ts";

export const postCampaign = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });

    const { title, description, goal, location, category, daysLeft } = req.body;
    if (!title || !description || !goal || !location || !category || daysLeft == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!req.file) return res.status(400).json({ message: "Image file is required" });

    const imageUrl = (req.file as any).path;

    const campaign = await campaignModel.create({
      title,
      description,
      image: imageUrl,
      goal,
      raised: 0,
      location,
      category,
      donors: 0,              
      daysLeft,
      user: req.user.userId,  // <-- fixed
    });

    return res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (err) {
    console.error("Create campaign error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCampaigns = async (_req: Request, res: Response) => {
  try {
    const campaigns = await campaignModel.find().populate("user", "email role");
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};


export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campagin = await campaignModel.findById(req.params.id).populate("user", "email role");
    if (!campagin) {
      return res.status(404).json({ message: "Campaign not found" });
    }
  } catch (err) {
    console.error("Get campaign by ID error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyCampaigns = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const campaigns = await campaignModel.find({ user: req.user.userId }); // <-- fixed
    return res.status(200).json({ campaigns });
    } catch (err) {
    console.error("Get my campaigns error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const editCampaign = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to edit this campaign" });
    }

    campaign.title = req.body.title ?? campaign.title;
    campaign.description = req.body.description ?? campaign.description;
    campaign.goal = req.body.goal ?? campaign.goal;
    campaign.location = req.body.location ?? campaign.location;
    campaign.category = req.body.category ?? campaign.category;
    campaign.daysLeft = req.body.daysLeft ?? campaign.daysLeft;

    const updated = await campaign.save();
    return res.status(200).json({ message: "Campaign updated", campaign: updated });
  } catch (err) {
    console.error("Update campaign error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Not authorized to delete this campaign" });
    }

    await campaign.deleteOne();
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting campaign", error });
  }
};
