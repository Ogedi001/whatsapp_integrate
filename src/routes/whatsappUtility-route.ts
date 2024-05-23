import { Router } from "express";
import { createWhatsAppTemplateMessage, sendWhatsAppTemplateMessage, sendWhatsAppTextMessage } from "../controller/whatsapUtility";

const router = Router()

router.route('/').post(sendWhatsAppTextMessage)
router.route('/create_template_message').post(createWhatsAppTemplateMessage)
router.route('/send_template_message').post(sendWhatsAppTemplateMessage)

export {router as messageRoute}
