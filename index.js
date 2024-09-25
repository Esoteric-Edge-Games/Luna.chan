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

client.login(process.env.LUNA_KEY); //Login the client

let lunaChannel; //Initialize the var for global scope

client.on("ready", () => {
  console.log("Luna-Chan operativa");
  lunaChannel = client.channels.cache.get(process.env.LUNA_CHANNEL); //"lunaChannel" is now the DC channel where Luna will speak
  startClock();
});

function startClock() {
  //Check every 60 seconds
  setTimeout(() => {
    checkHour();
    startClock();
  }, 60000);
}

function checkHour() {
  let date = new Date();
  date = new Date(date.getTime() + -3 * 60 * 60 * 1000);
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
        lunaChannel.send(
          "Ignorenme, soy una prueba de que estoy funcionando :)"
        );
      }
    });
  });
}
