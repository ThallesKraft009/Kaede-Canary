const db = require("../../Database/user.js");

module.exports = class AtmCommand {
  constructor(event, data, token){
    this.event = event;
    this.data = data;
    this.token = token;
  }

  async prefix(){
    if (this.event === "MESSAGE_CREATE"){
      if (this.data.content.startsWith("k!atm")){
        let membro = this.data.mentions[0] || this.data.author;
        

        let userdb = await db.findOne({
         userID: membro.id
     })
      
     if(!userdb){
         const newuser = new db({ userID: membro.id })
         await newuser.save();
         
         userdb = await db.findOne({ userID: membro.id })
      }

 let abreviar = formatNumber(userdb.economia.money);

        let x;
        if (membro.id === this.data.author.id){
          x = `💰 | Você tem **\`${abreviar}\`** kaedecoins no bolso!`
        } else {
          x = `💰 | <@${membro.id}> tem **\`${abreviar}\`** kaedecoins no bolso!`
        }

    let msg = {
        content: x,
        message_reference: {
        message_id: this.data.id, 
        channel_id: this.data.channel_id,
        guild_id: this.data.guild_id,
         }
      }

    try {
      await DiscordRequest(this.token, `/channels/${this.data.channel_id}/messages`, { 
        method: 'POST',
        body: msg 
      })
    } catch (erro)  {
    console.log(erro)
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

function formatNumber(number) {
  return number.toLocaleString('en-US');
  }