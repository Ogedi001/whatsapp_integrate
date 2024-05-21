import { Router } from "express";
import { sendWhatsAppTextMessage } from "../controller/whatsapUtility";

const router = Router()

router.route('/').post(sendWhatsAppTextMessage)

export {router as messageRoute}
