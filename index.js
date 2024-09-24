require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    32767,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.LUNA_KEY);

let lunaChannel;
client.on("ready", () => {
  console.log("Luna-Chan operativa");
  lunaChannel = client.channels.cache.get("1288105462172225671");
  lunaChannel.send("Buenos días a toda la gente de Esoteric :)");
});
