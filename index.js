const config = require('./config.json')
const loader = require('./src/loaders/Loader');
const entradaCall = require('./src/call/entrada-call');
const inportmassageCreate = require('./src/self-img/self-img');
const { Client, Intents, MessageManager } = require("discord.js-selfbot-v13");

const client = new Client({
  checkUpdate: false
});

client.once('ready', async () => {
  await loader.loadDrawingInLog();
  client.user.setActivity('umas parada ai', { type: 'STREAMING', url: 'https://www.twitch.tv/ryumen_0' });
  client.user.setStatus('idle');
});

inportmassageCreate(client);
entradaCall(client);

client.login(config.token);