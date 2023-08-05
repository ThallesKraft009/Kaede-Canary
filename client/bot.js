const WebSocket = require('websocket').w3cwebsocket;
const c = require("colors");
const { Command_Manager } = require("./commands.js");
const { connect } = require("mongoose");
const JSONWriter = require("./Utils/JsonWrite.js")
module.exports = class KaedeBot {
  constructor(token, intents, mongo_url) {
    this.token = token;
    this.intents = intents;
    this.mongo_url = mongo_url;
    this.payload = {
      op: 2,
      d: {
        token: token,
        intents: intents,
        properties: {
          $os: 'linux',
          $browser: 'chrome',
          $device: 'chrome',
        },
      },
    };

    const gatewayURL = 'wss://gateway.discord.gg/?v=9&encoding=json';
    this.gatewayURL = gatewayURL;
    this.ws = null;
    this.heartbeatInterval = null;
  }

  start() {
    this.ws = new WebSocket(this.gatewayURL);

    this.ws.onopen = () => {
      this.identify();
      console.log(c.blue("Websocket conectado ao Discord."))
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.op === 10) {
        const { heartbeat_interval } = data.d;
        this.heartbeatInterval = setInterval(this.sendHeartbeat.bind(this), heartbeat_interval);
        this.reconnectAttempts = 0;
        this.reconnectInterval = 1000;
      } else if (data.op === 11) {
        console.log('Heartbeat ACK received.');
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error.message);
      this.reconnect();
    };

    this.ws.onclose = () => {
      this.reconnect();
    };
  }

  identify() {
    this.ws.send(JSON.stringify(this.payload));
  }

  sendHeartbeat() {
    this.ws.send(JSON.stringify({ op: 1, d: null }));
  }

  reconnect() {
    clearInterval(this.heartbeatInterval);
    this.ws.close();

    this.reconnectAttempts++;
    const reconnectIntervalIncrement = Math.random() * 1000;
    const maxReconnectInterval = 60000;
    this.reconnectInterval = Math.min(
      this.reconnectInterval * 2 + reconnectIntervalIncrement,
      maxReconnectInterval
    );

    setTimeout(() => {
      this.start();
    }, this.reconnectInterval);
  }

  setStatus({ status: a, game: x }) {
    const statusPayload = {
      op: 3,
      d: {
        since: null,
        game: x,
        status: `${a}`,
        afk: false,
      },
    };
    setTimeout(() => {
    this.ws.send(JSON.stringify(statusPayload));
  }, 5000)
  }

  events() {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.op === 0) {
      const { t, d } = data;
      let evento = t;
        
      Command_Manager(evento, d, this.token, this.ws);
        //console.log(evento, d)

      if (evento === "READY"){

       // console.log(d)

      d.session_id = null;
      d._trace = null;

  let jsonWriter = new JSONWriter('client/data/client.json');
jsonWriter.writeData(d);

  console.log(c.green("Kaede está on-line."))
        connect(this.mongo_url)
      }

    
  }
    };
  }
};
    