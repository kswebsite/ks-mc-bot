const mineflayer = require('mineflayer');
const express = require('express');
const app = express();
app.use(express.json());

app.post('/start-bot', (req, res) => {
  const { ip, port, username } = req.body;

  const bot = mineflayer.createBot({
    host: ip,
    port: parseInt(port),
    username
  });

  bot.on('login', () => console.log(`${username} joined ${ip}:${port}`));
  bot.on('chat', (user, message) => console.log(`<${user}> ${message}`));

  bot.on('spawn', () => {
    setInterval(() => {
      const directions = ['forward', 'back', 'left', 'right'];
      const dir = directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(dir, true);
      setTimeout(() => bot.setControlState(dir, false), 1000);
    }, 5000);
  });

  bot.on('error', (err) => console.log('Error:', err));
  bot.on('end', () => console.log('Bot disconnected'));

  res.json({ message: `Bot started as ${username}` });
});

app.listen(3000, () => console.log('Bot server running on port 3000'));
