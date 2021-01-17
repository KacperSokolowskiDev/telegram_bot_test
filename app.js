require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

//token = "1554866680:AAHebLJjTYukpQLO-iVL26opRUHqOm_Ai6I"

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });

//onText -> reacting to messages, /\/echo (.+)/ -> means that we have to write /echo + some text after
//chatId -> ID of user, only with it we can send a message from bot to telegram
//if we want the bot to be self-sufficient, need to store chats ID somewhere
//resp is the string after the /echo command
bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

let users = [];

bot.onText(/\/register/, (msg, match) => {
  const chatId = msg.chat.id;
  users.push(chatId);
  console.log("user registered!");
  bot.sendMessage(chatId, "Done");
});
//spamming users who registered with messages
setInterval(function () {
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      bot.sendMessage(users[i], "Is this annoying ?");
    }
  } else {
    console.log("no user registered! :(");
  }
}, 1000);

//bot.on reacts to instant message context.
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == "Hello There") {
    bot.sendMessage(chatId, "General Kenobi");
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text == "Fuck you") {
    bot.sendMessage(chatId, "Fuck you too");
  }
});

//sending polls
bot.onText(/\/poll/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log("Poll sent !");
  bot.sendPoll(chatId, "Am I a cool bot ?", ["Sure buddy", "Not yet"]);
});
