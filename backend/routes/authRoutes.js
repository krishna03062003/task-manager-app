import express from "express";
import { getMe, loginUser, logoutUser, registerUser } from "../controller/authController.js";
import protect from "../middleware/authMiddleware.js";


const authrouter = express.Router();

authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);
authrouter.post("/logout", logoutUser);
authrouter.get("/me", protect,getMe);
export default authrouter;