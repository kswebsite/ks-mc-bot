const mineflayer = require('mineflayer');

const [ip, port, username] = process.argv.slice(2);

if (!ip || !port || !username) {
  console.error('Usage: node bot.js <ip> <port> <username>');
  process.exit(1);
}

const bot = mineflayer.createBot({
  host: ip,
  port: parseInt(port),
  username: username
});

bot.on('login', () => {
  console.log(`${username} has joined the server ${ip}:${port}`);
});

bot.on('chat', (username, message) => {
  console.log(`${username}: ${message}`);
});

setInterval(() => {
  if (bot && bot.chat) bot.chat('Hello from bot!');
}, 30000);
