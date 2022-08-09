import { App, ExpressReceiver } from "@slack/bolt";
import axios from "axios";

export const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || "",
});

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
  customRoutes: [
    {
      path: "/slack/list_public_channels",
      method: "GET",
      handler(req, res) {
        res.end("Hello World");
      },
    },
  ],
});

/* Add functionality here */

async function getPublicChannels() {
  const channels = await app.client.conversations.list({
    token: process.env.USER_LEVEL_TOKEN,
  });
  console.log("CHANNELS", channels.channels);
  return channels.channels;
}

getPublicChannels();

async function getGroups() {
  const groups = await axios.get(`https://slack.com/api/usergroups.list`, {
    headers: { Authorization: `Bearer ${process.env.USER_LEVEL_TOKEN}` },
  });

  console.log("GROUPS", groups.data.usergroups);
}

getGroups();

async function createChannel() {
  const channel = await app.client.conversations.create({
    token: process.env.SLACK_BOT_TOKEN,
    name: "newchannel",
    is_private: false,
  });
  console.log(channel);
}

// createChannel();

// Pegar team_id do payload do evento de canal criado

// async function addExternalUser() {
//   const user = await app.client.admin.users.invite({
//     token: process.env.USER_LEVEL_TOKEN,
//     channel_ids: "C03STVDVCD8",
//     email: "giovanna.freire@edu.unipar.br",
//     team_id: "T03SR1BNLF7",
//   });

//   console.log("EXTERNAL USER", user);
// }

// addExternalUser();

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!");
})();
