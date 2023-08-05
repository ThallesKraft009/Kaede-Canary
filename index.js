const KaedeBot = require("./client/bot.js");

const Kaede = new KaedeBot(process.env.token, 3276799, process.env.mongo);
Kaede.start();
Kaede.events();
Kaede.setStatus("dnd", {
  name: "Atualizando...",
  type: 0
})