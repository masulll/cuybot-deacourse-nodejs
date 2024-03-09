const TelegramBot = require("node-telegram-bot-api");
const commands = require("../libs/commands");
const { helpText, invalidCommand } = require("../libs/constant");

class Cuybot extends TelegramBot {
  constructor(token, options) {
    super(token, options);
    this.on("message", (data) => {
      const isCommand = Object.values(commands).some((keyword) =>
        keyword.test(data.text)
      );

      if (!isCommand) {
        console.log(
          `Invalid Command Executed By ${data.from.username} => ${data.text}`
        );
        this.sendMessage(data.from.id, invalidCommand, {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "Help",
                  callback_data: "go_to_help",
                },
              ],
            ],
          },
        });
        this.on("callback_query", (callback) => {
          const callbackName = callback.data;
          if (callbackName == "go_to_help") {
            this.sendMessage(callback.from.id, helpText);
          }
        });
      }
    });
  }

  getAllCommands() {}

  getHelp() {
    this.onText(commands.help, async (data) => {
      const botProfile = await this.getMe();
      this.sendMessage(data.from.id, helpText);
    });
  }

  getSticker() {
    this.on("sticker", (data) => {
      this.sendMessage(data.from.id, data.sticker.emoji);
    });
  }

  // listener for command  message
  getGreeting() {
    this.onText(commands.halo, (data) => {
      this.sendMessage(
        data.from.id,
        `halo juga ${data.from.first_name} sayangku! mau ngapain hari ini?🤗 `
      );
    });
  }

  // listener for all message
  getToKnow() {
    this.on("message", async (data) => {
      const botProfile = await this.getMe();
      if (data.text !== "!halo") {
        this.sendMessage(
          data.from.id,
          `Halo perkenalkan saya adalah ${botProfile.first_name}, ada yang bisa saya bantu?`
        );
      }
    });
  }
  getToFollow() {
    this.onText(commands.follow, (data, after) => {
      this.sendMessage(data.from.id, `kata-katamu: ${after[1]}`);
    });
  }

  getQuotes() {
    this.onText(commands.quotes, async (data) => {
      const quoteEndpoint = "https://api.kanye.rest/";

      try {
        const apiCall = await fetch(quoteEndpoint);
        const { quote } = await apiCall.json();

        this.sendMessage(data.from.id, `kata-kata hari ini: \n ${quote}`);
      } catch (error) {
        console.error(error);
        this.sendMessage(data.from.id, `Maaf silahkan ulangi lagi`);
      }
    });
  }

  getNews() {
    this.onText(commands.news, async (data) => {
      const newsEndpoint = "https://jakpost.vercel.app/api/category/indonesia";
      this.sendMessage(data.from.id, "Mohon tunggu sebentar..");
      try {
        const apiCall = await fetch(newsEndpoint);
        const response = await apiCall.json();
        const maxNews = 4;
        for (let i = 0; i < maxNews; i++) {
          const news = response.posts[i];
          const { title, image, headline } = news;
          this.sendPhoto(data.from.id, image, {
            caption: `Judul: ${title} \n \n Headline: ${headline}`,
          });
        }

        // bot.sendMessage(data.from.id, `Berita hari ini: \n ${news}`);
      } catch (error) {
        console.error(error);
        this.sendMessage(data.from.id, `Maaf silahkan ulangi lagi`);
      }
    });
  }

  getEqInfo() {
    const quakeEndpoint = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";
    try {
      this.onText(commands.quakes, async (data) => {
        const waitMsg = await this.sendMessage(
          data.from.id,
          "Mohon tunggu sebentar.. 🙏"
        );
        this.deleteMessage(data.chat.id, waitMsg.message_id);
        const apiCall = await fetch(quakeEndpoint);
        const response = await apiCall.json();
        const { gempa } = await response.Infogempa;
        const { Wilayah, Magnitude, Tanggal, Jam, Kedalaman, Shakemap } = gempa;

        const imgSourceUrl = "https://data.bmkg.go.id/DataMKG/TEWS/" + Shakemap;

        this.sendPhoto(data.from.id, imgSourceUrl, {
          caption: `Info gempa terbaru ${Tanggal}/ ${Jam}: \n \n Wilayah: ${Wilayah} \n \n Besaran: ${Magnitude} SR \n \n Kedalaman: ${Kedalaman} SR`,
        });
      });
    } catch (error) {}
  }
}
module.exports = Cuybot;
