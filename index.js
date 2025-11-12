const mineflayer = require('mineflayer');

let bot; // We'll store the bot instance here

function createBot() {
  bot = mineflayer.createBot({
    host: 'ks_warrior.aternos.me',
    port: 41625,
    username: 'BotPlayer123', // Change this
  });

  bot.on('login', () => {
    console.log('Bot has joined the server!');
  });

  // Make the bot say hello every 30 seconds
  const chatInterval = setInterval(() => {
    if (bot && bot.entity) bot.chat('Hello everyone!');
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

  // Handle errors
  bot.on('error', err => console.log('Error:', err));

  // Handle disconnection and reconnect
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    clearInterval(chatInterval); // stop previous chat interval
    setTimeout(createBot, 5000);
  });
}

// Start the bot for the first time
createBot();
