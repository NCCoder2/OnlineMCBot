const express = require('express');
const mineflayer = require('mineflayer');
const { AutoAuth } = require('mineflayer-auto-auth');
const config = require('./config.json');

const app = express();

function startBot() {
  const bot = mineflayer.createBot({
    host: config.serverIP,
    port: config.serverPort,
    username: config.botUsername,
    plugins: [AutoAuth],
    AutoAuth: 'bot112022'
  });


  bot.on('error', (err) => {
    console.log('Bot encountered an error:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected from the server');
  });

  bot.on('spawn', () => {
    console.log('Bot has spawned successfully.');
    bot.chat('Connected Sucessfully!');
    startLiveApp();
  });
}

function startLiveApp() {
  app.get('/', (req, res) => {
    res.send('Minecraft Connected!');
  });

  app.listen(3000, () => {
    console.log(`Website is Running on  http://localhost:3000`);
  });
}

startBot();
