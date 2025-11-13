const express = require('express');
const mineflayer = require('mineflayer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve index.html in root

let bot = null;

app.post('/join', (req, res) => {
  const { ip, port: serverPort, username } = req.body;

  if (!ip || !serverPort || !username) {
    return res.status(400).json({ status: 'error', message: 'All fields are required' });
  }

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
    res.json({ status: 'joined', message: `Bot ${username} has joined the server ${ip}:${serverPort}` });
  });

  bot.on('chat', (user, message) => {
    if (user !== bot.username) {
      console.log(`${user}: ${message}`);
    }
  });

  bot.on('end', () => console.log('Bot disconnected'));
  bot.on('error', err => console.error('Bot error:', err));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
