import "dotenv/config";
import axios from "axios";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors";
import { ButtonType, Category, Payload } from "../interface/interface";
import Logger from "../logger";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const RECIPIENT_PHONE_NUMBER = process.env.RECIPIENT_PHONE_NUMBER;
const BUSSINESS_ACCOUNT_ID = process.env.BUSSINESS_ACCOUNT_ID

export const sendWhatsAppTextMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
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
    return next(error);
  }
};

// template contains, header, body, footer, and buttons.  only 'body' must be provided, others are optional
export const createWhatsAppTemplateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    category,
    payload,
    name,
  }: { category: Category; payload: Payload; name: string } = req.body;
    const url = `https://graph.facebook.com/v20.0/${BUSSINESS_ACCOUNT_ID}/message_templates`;
  const components = [];
  
  if (!name)
    throw new BadRequestError(
      'Template "name" field is required, must be a string'
    );
  if (!category || !Object.values(Category).includes(category)) {
    throw new BadRequestError(
      'Template "category" field is required, available categories [AUTHENTICATION, MARKETING, UTILITY]'
    );
  }
  if (!payload || typeof payload.body !== 'string')
    throw new BadRequestError('Payload must include a "body" field with text.');

  if (payload.header) {
    components.push({
      type: "HEADER",
      format: "TEXT",
      text: payload.header,
    });
  }

  components.push({
    type: "BODY",
    text: payload.body,
  });

  if (payload.footer) {
    components.push({
      type: "FOOTER",
      text: payload.footer,
    });
  }

  if (payload.buttons && payload.buttons.length > 0) {
    const buttons = payload.buttons.map((button) => {
      if (!Object.values(ButtonType).includes(button.type)) {
        throw new BadRequestError(
          "Template button type, must be either [PHONE_NUMBER,URL,QUICK_REPLY]"
        );
      }
      if (button.type === ButtonType.PHONE_NUMBER) {
        if (!button.phone_number)
          throw new BadRequestError(
            '"phone_number" field is required, for PHONE_NUMBER button type'
          );
      }

      if (button.type === ButtonType.URL) {
        if (!button.url)
          throw new BadRequestError(
            '"url" field is required, for URL button type'
          );
      }
      return {
        type: button.type,
        text: button.text,
        phone_number: button.phone_number,
        url: button.url,
      };
    });
    components.push({
      type: "BUTTONS",
      buttons,
    });
  }

  
  const data={
      name,
      language: 'en_US', 
      category,
      components
  }

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Template created successfully', data: response.data });
  } catch (error) {

    return next(error);
  }
};



export const sendWhatsAppTemplateMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`;
  const data = {
    messaging_product: "whatsapp",
    to: RECIPIENT_PHONE_NUMBER,
    type: "template",
    template: {
      name: "promotion_times", 
      language: {
        code: "en_US",
      },
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
    return next(error);
  }
};

