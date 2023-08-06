module.exports = class PayCommand {
  constructor(event, data, token){
    this.event = event;
    this.data = data;
    this.token = token;
  }

  async prefix(){
    if (this.event === "MESSAGE_CREATE"){
      let prefix = "k!";
      
 if(!this.data.content.startsWith(prefix)) return; 
      
	const args = this.data.content.slice(prefix.length).trim().split(/ +/g); 
      
	const cmd = args.shift().toLowerCase();

      if (cmd === "pagar" || cmd === "pay"){
        
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