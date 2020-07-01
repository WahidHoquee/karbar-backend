import { Router } from "express";
import { fetchMenu } from '../controllers/menu'

const menu = Router();

menu.get("/", fetchMenu);

export default menu;
