import { Router } from "express";
import { messageRoute } from "./whatsappUtility-route";

const router = Router()

router.use('message',messageRoute)

export {router as ApplicationRoute}