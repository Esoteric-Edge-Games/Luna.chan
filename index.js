require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  //Discord Client
  intents: [
    32767,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.LUNA_KEY); //Login the client

let lunaChannel; //Initialize the var for global scope

client.on("ready", () => {
  console.log("Luna-Chan operativa");
  lunaChannel = client.channels.cache.get(process.env.LUNA_CHANNEL); //"lunaChannel" is now the DC channel where Luna will speak
});
