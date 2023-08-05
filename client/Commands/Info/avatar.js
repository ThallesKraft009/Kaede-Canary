const {
  Button,
  componente
} = require("../../Utils/Componentes.js")
module.exports = class AvatarCommand{
  constructor(event, data, token){
    this.event = event;
    this.data = data;
    this.token = token;
  }

  async prefix(){
    if (this.event === "MESSAGE_CREATE"){

      if (this.data.content.startsWith("k!avatar")) {

        let member = this.data.mentions[0] || this.data.author

        let embed = {
          title: `🎴 | ${member.global_name}`,
          image: {
            url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`
          },
          color: 65535
        };

      let button = Button({
        label: "Baixe o Avatar",
        style: 5,
        url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`
      })

        button = componente(button);
      
     // console.log(this.data)

        

  let msg = {
        content: `<@${this.data.author.id}>`,
        embeds: [embed],
        components: [
                 {
                   type: 1,
                   components: [
                    {
                    type: 2,
                    label: "Baixe o Avatar",
                    style: 5,
                    url: `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`
                }
            ]
                 }
          ],
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