import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllUser,
    deleteUser,
    updateUser
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js"

const router = express.Router();

// READ
router.get("/getAll", verifyToken, getAllUser);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
router.patch("/:id/:friendsId", verifyToken, addRemoveFriend);
router.patch("/:id", verifyToken, updateUser)

/* DELETE */
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
