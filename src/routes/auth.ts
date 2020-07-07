import { Router } from "express";
import { authUser } from '../controllers/auth'

const user = Router();

user.post("/", authUser);

export default user;