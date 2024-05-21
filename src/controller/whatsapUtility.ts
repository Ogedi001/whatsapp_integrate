import "dotenv/config";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER;

export const sendWhatsAppTextMessage = async (req: Request, res: Response,next:NextFunction) => {
  const { message } = req.body
  if (!message)
    throw new BadRequestError(
      'The "message" field is required. Please provide a message to send.'
    );
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: RECIPIENT_PHONE_NUMBER,
    type: "text",
    text: {
      preview_url: true,
      body: message,
    },
  };
  try {
    const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      return res
        .status(StatusCodes.OK)
        .json({ message: "success", data: response.data });
  } catch (error) {
    return next(error)
  }
};

