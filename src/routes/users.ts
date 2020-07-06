import { Router } from "express";
import { registerUser } from '../controllers/users'

const user = Router();

user.post("/", registerUser);

export default user;