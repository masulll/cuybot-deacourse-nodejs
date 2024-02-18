const env = require("dotenv").config();
const Cuybot = require("./app/Cuybot");

const token = process.env.TELEGRAM_TOKEN;
const options = { polling: true };
const cuybot = new Cuybot(token, options);

const main = () => {
  cuybot.getToKnow();
  cuybot.getGreeting();
  cuybot.getSticker();
  cuybot.getToFollow();
  cuybot.getQuotes();
  cuybot.getNews();
  cuybot.getEqInfo();
  cuybot.getHelp();
};

main();
