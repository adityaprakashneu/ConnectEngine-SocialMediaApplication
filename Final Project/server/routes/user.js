import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriends,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js"
import { get } from "mongoose";

const router = express.Router();

// READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendsId", verifyToken, addRemoveFriends);

export default router;