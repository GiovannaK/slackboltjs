import { App, ExpressReceiver } from "@slack/bolt";
import axios from "axios";
import bodyParser from "body-parser";
import {
  addUsersToChanel,
  createChannel,
  getPublicChannels,
} from "./adapters/presentation/controllers/channels";
import {
  addUsersToGroup,
  createGroup,
  getGroups,
} from "./adapters/presentation/controllers/groups";
import { getAllUsersFromTeam } from "./adapters/presentation/controllers/users";

export const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "",
});

receiver.router.use(bodyParser.urlencoded({ extended: true }));
receiver.router.use(bodyParser.json());

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.APP_LEVEL_TOKEN,
  socketMode: true,
});

receiver.router.get("/slack/list_public_channels", (req, res) => {
  getPublicChannels(res);
});

receiver.router.post("/slack/create_channel", (req, res) => {
  createChannel(res, req.body);
});

receiver.router.get("/slack/list_groups", (req, res) => {
  getGroups(res);
});

receiver.router.post("/slack/add_users_to_channel", (req, res) => {
  addUsersToChanel(res, req.body);
});

receiver.router.get("/slack/users", (req, res) => {
  getAllUsersFromTeam(res);
});

receiver.router.post("/slack/create_group", (req, res) => {
  createGroup(res, req.body);
});

receiver.router.post("/slack/add_user_to_group", (req, res) => {
  addUsersToGroup(res, req.body);
});

receiver.router.post('/slack/action', (req, res) => {
  res.send({challenge: req.body.challenge})
})

const payload = {
  channel: "C03T3NELAP6",
  text: "Hello World",
};

app.event("app_mention", async ({ body, context, say }) => {
  // const message = await client.chat.postMessage({
  //   channel: payload.channel,
  //   text: `${payload.text}`,
  //   token: process.env.SLACK_BOT_TOKEN
  // });
  // console.log('EVENT', event)
  // console.log('CLIENT', client)
  // console.log('MESSAGE', message)
  await say('hello world')
});

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
  await receiver.start(Number(process.env.PORT) || 3000);

  console.log("⚡️ Bolt app is running!");
})();
