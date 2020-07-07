import { Router } from "express";
import { registerUser, getCurrentUserInfo } from '../controllers/users'

const user = Router();

user.post("/", registerUser);

user.get("/me", getCurrentUserInfo);

export default user;