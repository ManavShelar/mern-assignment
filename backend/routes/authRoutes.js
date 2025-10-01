import express from "express";
import { registerUser, loginUser, getUsers, deleteUser } from "../controllers/authController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", protect, admin, getUsers);
router.delete("/users/:id", protect, admin, deleteUser);

export default router;
