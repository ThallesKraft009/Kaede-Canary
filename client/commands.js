async function Command_Manager(event, data, token, ws){

  ///////////////////////////////////////////
  let PingCommand = require("./Commands/Client/ping.js");

  let Ping = new PingCommand(event, data, token, ws)
  Ping.run();

  
}


module.exports = { Command_Manager };