import { Request, Response } from "express";
import { app } from "../../..";
import { arrayToStringBySeparator } from "../../../helpers";
import {
  AddUserToChanelInterface,
  CreateChannel,
  sendMessageWithMentionInterface,
} from "../../interfaces";

export async function getPublicChannels(res: Response) {
  try {
    const channels = await app.client.conversations.list({
      token: process.env.USER_LEVEL_TOKEN,
    });
    return res.status(200).json(channels.channels);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function createChannel(res: Response, payload: CreateChannel) {
  try {
    const channel = await app.client.conversations.create({
      token: process.env.USER_LEVEL_TOKEN,
      name: payload.name,
      is_private: payload.is_private,
    });
    return res.status(200).json(channel);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function addUsersToChanel(
  res: Response,
  payload: AddUserToChanelInterface
) {
  try {
    const channel = await app.client.conversations.invite({
      token: process.env.USER_LEVEL_TOKEN,
      channel: payload.channel,
      users: arrayToStringBySeparator(payload.users, ","),
    });
    return res.status(200).json(channel.channel);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function sendMessageWithMention(
  payload: sendMessageWithMentionInterface
) {
  try {
    const event = app.event("app_mention", async ({ event, client }) => {
      const message = await client.chat.postMessage({
        channel: payload.channel,
        text: `${payload.text}, ${event.user}`,
      });
      console.log('MESSAGE', message)
    });
  } catch (error) {
    return error
  }
}
