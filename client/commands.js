async function Command_Manager(event, data, token, ws){

  ///////////////////////////////////////////
  let PingCommand = require("./Commands/Client/ping.js");

  let Ping = new PingCommand(event, data, token, ws)
  Ping.run();

  ///////////////////////////////////////////
  let AvatarCommand = require("./Commands/Info/avatar.js");

  let Avatar = new AvatarCommand(event, data, token)
  Avatar.run();

  ////////////////////////////////////////////
  let AtmCommand = require("./Commands/Economy/atm.js");

  let Atm = new AtmCommand(event, data, token)
  Atm.run();

  let DailyCommand = require("./Commands/Economy/daily.js");

  let daily = new DailyCommand(event, data, token)
  daily.run();
}


module.exports = { Command_Manager };