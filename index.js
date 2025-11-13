const express = require('express');
const mineflayer = require('mineflayer');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let bot = null;

app.post('/join', (req, res) => {
  const { ip, port: serverPort, username } = req.body;

  if (bot) {
    bot.quit('New connection requested');
    bot = null;
  }

  bot = mineflayer.createBot({
    host: ip,
    port: parseInt(serverPort),
    username: username
  });

  bot.on('login', () => {
    console.log('Bot has joined the server');
    res.json({ status: 'joined', message: 'Bot has joined the server!' });
  });

  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`);
  });

  bot.on('end', () => console.log('Bot disconnected'));
});
  
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
