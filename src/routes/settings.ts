import { Router } from "express";
import { mailSender } from '../controllers/mailSender'

const mailSend = Router();

mailSend.post("/bulkMailSend", mailSender);

export default mailSend;
