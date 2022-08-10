import { Response } from "express";
import { app } from "../../..";

export async function getAllUsersFromTeam(res: Response) {
  try {
    const users = await app.client.users.list({
      token: process.env.SLACK_BOT_TOKEN,
    });
    return res.status(200).json(users.members);
  } catch (error) {
    return res.status(500).json(error);
  }
}
