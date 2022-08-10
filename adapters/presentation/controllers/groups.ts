import { Response } from "express";
import { app } from "../../..";
import { arrayToStringBySeparator } from "../../../helpers";
import {
  AddUserToGroupInterface,
  CreateGroupInterface,
} from "../../interfaces";

export async function getGroups(res: Response) {
  try {
    const groups = await app.client.usergroups.list({
      token: process.env.USER_LEVEL_TOKEN,
    });
    return res.status(200).json(groups.usergroups);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function createGroup(
  res: Response,
  payload: CreateGroupInterface
) {
  try {
    const group = await app.client.usergroups.create({
      ...payload,
      token: process.env.USER_LEVEL_TOKEN,
      channels:
        payload.channels !== undefined
          ? arrayToStringBySeparator(payload.channels, ",")
          : undefined,
    });
    return res.status(200).json(group.usergroup);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export async function addUsersToGroup(
  res: Response,
  payload: AddUserToGroupInterface
) {
  try {
    const group = await app.client.usergroups.update({
      ...payload,
      token: process.env.USER_LEVEL_TOKEN,
      users: arrayToStringBySeparator(payload.users, ","),
    });
    return res.status(200).json(group.usergroup);
  } catch (error) {
    return res.status(500).json(error);
  }
}

