const db = require("../../Database/user.js");
const tempo = require("ms");

module.exports = class DailyCommand {
  constructor(event, data, token){
    this.event = event;
    this.data = data;
    this.token = token;
  }

  async prefix(){
    if (this.event === "MESSAGE_CREATE"){
      if (this.data.content.startsWith("k!daily")){

        let membro = this.data.author;

        let userdb = await db.findOne({
         userID: membro.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: membro.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: membro.id })
     }

  if(Date.now() < userdb.economia.daily){
      const calc = userdb.economia.daily - Date.now()

    let msg = {
      content: `🚫 | Você só pode pegar seu daily novamente em ${ms(calc).hours}h ${ms(calc).minutes}m ${ms(calc).seconds}s !`,
      message_reference: {
        message_id: this.data.id, 
        channel_id: this.data.channel_id,
        guild_id: this.data.guild_id,
      }
    }
         return await DiscordRequest(this.token, `/channels/${this.data.channel_id}/messages`, { 
        method: 'POST',
        body: msg 
      })
           
     } else {

    let moedas = Math.floor(Math.random() * 1000) + 10000;

    await db.updateOne({
         userID: membro.id
     }, { $set: {
  "economia.money": userdb.economia.money + moedas,
  "economia.daily": Date.now() + tempo("12h"),
     }
     })

    let response = {
      content: `💰 | Você resgatou seu daily e ganhou **\`${formatNumber(moedas)}\`**  KaedeCoins!`,
      message_reference: {
        message_id: this.data.id, 
        channel_id: this.data.channel_id,
        guild_id: this.data.guild_id,
      }
    }

    return await DiscordRequest(this.token, `/channels/${this.data.channel_id}/messages`, { 
        method: 'POST',
        body: response 
      })

    
     }
        
      }
    }
  }
  async run(){
    this.prefix();
  }
}

async function DiscordRequest(token, endpoint, options) {
  const url = 'https://discord.com/api/v10/' + endpoint;
  
  if (options.body) options.body = JSON.stringify(options.body);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': 'DiscordBot (https://github.com/discord/discord-example-app, 1.0.0)',
    },
    ...options
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }

  return res;
    }

        function ms(ms) {
  const seconds = ~~(ms/1000)
  const minutes = ~~(seconds/60)
  const hours = ~~(minutes/60)
  const days = ~~(hours/24)

  return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
                              }

function formatNumber(number) {
  return number.toLocaleString('en-US');
    }