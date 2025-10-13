import { Request, Response } from "express";
import campaignModel from "../models/campaign.model";
import "../utils/CampaginCron";

// Create campaign
export const postCampaign = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthenticated" });

    const { title, description, goal, location, category, urgent } = req.body;
    if (!title || !description || !goal || !location || !category) {
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
      urgent: urgent || false,
      daysLeft: 30,
      user: req.user._id, // ✅ use user._id
    });

    return res.status(201).json({ message: "Campaign created successfully", campaign });
  } catch (err) {
    console.error("Create campaign error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all campaigns
export const getAllCampaigns = async (_req: Request, res: Response) => {
  try {
    const campaigns = await campaignModel
      .find()
      .populate("user", "fullname email role"); // populate username
    res.status(200).json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Error fetching campaigns", error });
  }
};

// Get campaign by ID
export const getCampaignById = async (req: Request, res: Response) => {
  try {
    const campaign = await campaignModel
  .findById(req.params.id)
  .populate("user", "fullname email role"); // ensure 'fullname' exists in DB


    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    return res.status(200).json(campaign);
  } catch (err) {
    console.error("Get campaign by ID error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get campaigns for logged-in user
export const getMyCampaigns = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const campaigns = await campaignModel
      .find({ user: req.user._id })
      .populate("user", "fullname email role");

    return res.status(200).json({ campaigns });
  } catch (err) {
    console.error("Get my campaigns error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Edit campaign
export const editCampaign = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to edit this campaign" });
    }

    campaign.title = req.body.title ?? campaign.title;
    campaign.description = req.body.description ?? campaign.description;
    campaign.goal = req.body.goal ?? campaign.goal;
    campaign.location = req.body.location ?? campaign.location;
    campaign.category = req.body.category ?? campaign.category;
    campaign.daysLeft = req.body.daysLeft ?? campaign.daysLeft;
    campaign.urgent = req.body.urgent ?? campaign.urgent;

    const updated = await campaign.save();
    return res.status(200).json({ message: "Campaign updated", campaign: updated });
  } catch (err) {
    console.error("Update campaign error", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete campaign
export const deleteCampaign = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const campaign = await campaignModel.findById(req.params.id);
    if (!campaign) return res.status(404).json({ message: "Campaign not found" });

    if (campaign.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this campaign" });
    }

    await campaign.deleteOne();
    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting campaign", error });
  }
};


