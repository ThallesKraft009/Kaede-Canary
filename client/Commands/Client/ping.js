module.exports = class PingCommand {
  constructor(event, data, token){
    this.event = event;
    this.data = data;
    this.token = token;
  }

  async prefix(){
    if (this.event === "MESSAGE_CREATE") {

      if (this.data.content !== "k!ping") return;

      let msg = {
        content: "Pong!",
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