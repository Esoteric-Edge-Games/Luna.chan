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
const fs = require("fs");

const meses = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

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

client.login(process.env.LUNA_KEY); //Login the client

let lunaChannel; //Initialize the var for global scope

client.on("ready", () => {
  console.log("Luna-Chan operativa");
  lunaChannel = client.channels.cache.get(process.env.LUNA_CHANNEL); //"lunaChannel" is now the DC channel where Luna will speak
  startClock();
});

function startClock() {
  //Every 60 seconds, check hour & recursion
  setTimeout(() => {
    checkHour();
    startClock();
  }, 60000);
}

function checkHour() {
  //Check if current time matchs any of DSU.JSON
  let date = new Date();
  date = new Date(date.getTime() + -3 * 60 * 60 * 1000); //Set hour to GMT-3 (Argentina)
  let dayNumber = date.getDate();
  let month = meses[date.getMonth()];
  let time = date.getHours();
  let hour = time;
  let amPm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  minute = date.getMinutes();
  fs.readFile("./JSON/DSU.JSON", function (err, data) {
    if (err) {
      console.error(err);
    }
    JSON.parse(data).forEach((e) => {
      if (
        e.fecha === dayNumber &&
        e.mes === month &&
        e.hora === hour &&
        e.minuto === minute &&
        e.amPm === amPm
      ) {
        console.log("Hora de mandar el mensaje!");
        fetchData();
      }
    });
  });
}

async function fetchData() {
  //Retrieve the data
  try {
    const response = await fetch(
      //Take the data from Trello
      "https://api.trello.com/1/boards/" +
        process.env.TRELLO_REPO + //ID of workspace
        "/cards?key=" +
        process.env.TRELLO_API_KEY + //Trello key
        "&token=" +
        process.env.TRELLO_TOKEN // Trello personal token
    );
    const allCards = await response.json(); //JSONify the response
    const cardCounts = { ...esotericTeam }; //Create a temporary copy of esotericTeam
    Object.entries(cardCounts).forEach(([key, value]) => {
      cardCounts[key] = { inProgress: 0, done: 0 };
      /*
      Replace the value from "discordId" to "{inProgress:0,done:0}". Example:
      "6647d802a75b4fbdcc4538dc":{ inProgress: 0, done: 0 }
      */
    });
    allCards.forEach((c) => {
      //For each Trello card
      let status = null; //Intialize a "status" var
      if (
        c.idList === process.env.LIST_OF_CHORES ||
        c.idList === process.env.LIST_OF_IN_PROGRESS
      ) {
        status = "inProgress"; //If it's assigned and not completed
      } else if (c.idList === process.env.LIST_OF_REVIEW) {
        console.log(c);
        status = "done"; //If it's assigned and waiting for review
      } else {
        return; //Early return
      }
      const member = Object.keys(esotericTeam).find(
        //Finds and returns the "part" of esotericTeam which matchs with the Trello card member
        (trelloid) => trelloid === c.idMembers[0]
      );
      cardCounts[member][status] += 1; //Ups by "1" on the "in progress" or "done"
    });
    let i = 0; //Initialice an "i" var for loop porpuses
    Object.entries(cardCounts).forEach(([key, value]) => {
      /*Make "cardCounts" an array for making the loop part easy. Then loop around it*/
      lunaChannel.send(
        //This is what Luna will send
        "<@" +
          /*
          Make "esotericTeam" an array for calling the index with the loop. 
          [1] is for taking the value of the previous object, not the key part
          */
          Object.entries(esotericTeam)[i][1] +
          "> tiene " +
          value.inProgress +
          " tarjetas en progreso y " +
          value.done +
          " tarjetas listas"
      );
      i++; //Up the "i" var by 1
    });
    //TODO: Luna DSU messages & Total cards done this week
  } catch (e) {
    console.error(e);
  }
}
