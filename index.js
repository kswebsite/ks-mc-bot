const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
  host: 'ks_warrior.aternos.me',
  port: 41625,
  username: 'BotPlayer123', // Change this
});

bot.on('login', () => {
  console.log('Bot has joined the server!');
});

// Make the bot say hello every 30 seconds
setInterval(() => {
  bot.chat('Hello everyone!');
}, 30000);

// Random movement to look like a real player
function randomMove() {
  const directions = ['forward', 'back', 'left', 'right'];
  const direction = directions[Math.floor(Math.random() * directions.length)];

  bot.setControlState(direction, true);
  setTimeout(() => {
    bot.setControlState(direction, false);
    setTimeout(randomMove, Math.random() * 5000); // Random delay before next move
  }, Math.random() * 3000); // Random movement duration
}

bot.on('spawn', () => {
  randomMove();
});

// Log chat from other players
bot.on('chat', (username, message) => {
  console.log(`<${username}> ${message}`);
});

// Handle errors and disconnections
bot.on('error', err => console.log('Error:', err));
bot.on('end', () => console.log('Bot disconnected'));
