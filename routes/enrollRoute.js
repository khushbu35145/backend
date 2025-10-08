import express from "express";
import { sendApplicationEmail } from "../controller/enroll.js";

const router = express.Router();

router.post("/enroll", sendApplicationEmail);

export default router;
