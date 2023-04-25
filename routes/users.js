import express from "express";
import { like, dislike } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
