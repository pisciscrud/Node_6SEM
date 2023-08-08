const TelegramBot = require("node-telegram-bot-api");


const token = "6084155708:AAHyhsUh6V8AOpgg7Rw8WKWxpS-5aavWsvI";


const bot = new TelegramBot(token, { polling: true });


bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;
  bot.sendMessage(chatId, `echo: ${message}`);
});


