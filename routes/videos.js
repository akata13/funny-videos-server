import express from "express";
import { addVideo, getVideos } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, addVideo);
router.get("/list", getVideos);

export default router;
