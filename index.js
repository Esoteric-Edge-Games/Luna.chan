require("dotenv").config();
const { randomBytes } = require("crypto");
const { Client, GatewayIntentBits, heading } = require("discord.js");
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
const fs = require("fs");
const http = require("http"); //We need to create an endpoint, so we're creating a "server"
const port = process.env.PORT;

/*
const esotericTeam = {
  //TRELLOID : DISCORDID
  "6647d802a75b4fbdcc4538dc": "492729222276579333", //Juanse
  "6647ca417e0fc2e77e3c4920": "417198683701116940", //Lucho
  "646fae139a1c99a39f66e32d": "347833469474439170", //Toby
  "6647d0437ba1a7f67db50a75": "551463506344411156", //Eli
  "62f0759b9be20318ddf5f00d": "644379308684476426", //Cris
  "62e899f9c63ee631931d5798": "368217259094704128", //Ale
  "66513c35adf44c7b0ec3023c": "295023905679212557", //Alex
  "6655def75e2e8eb8723a3d5f": "705127114759995494", //Lucas
};
*/
if (!process.env.LUNA_KEY) {
  console.error("Error: No hay token de Discord");
}
client.login(process.env.LUNA_KEY); //Login the client

client.on("clientReady", () => {
  console.log("Luna-Chan operativa");
});

client.on("messageCreate", async (message) => {
  let input = message.content; //Save message
  if (RNG(4) > 3) {
    return; //Early return if bot decides to not respond
  }
  let output = callEden(input, message.author.username); //Call Eden API with message as input
  message.reply(output); //Reply to message with output from Eden
  //updateEden(input, output); //Update Eden with input and output
});

function RNG(max) {
  let random = Math.round(Math.random() * max);
  return random;
}

async function callEden(input, author) {
  const updatedInput = author + " dice: " + input;

  const response = await fetch("http://127.0.0.1:5000/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          content: updatedInput,
        },
      ],
      temperature: 0.6,
      top_p: 0.95,
      top_k: 20,
    }),
  });
  const data = await response.json();
  return data;
}

//function updateEden(input, output) {
//Update Eden with input and output
//}
