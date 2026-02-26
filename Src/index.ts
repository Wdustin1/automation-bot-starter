import 'dotenv/config';
import { Telegraf } from 'telegraf';

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Missing TELEGRAM_BOT_TOKEN. Copy .env.example to .env and add your bot token.');
  process.exit(1);
}

const bot = new Telegraf(token);

// Simple health check command
bot.start(async (ctx) => {
  await ctx.reply(
    'Bot is running ✅\n\nCommands:\n/help - list commands\n/ping - quick test'
  );
});

bot.command('help', async (ctx) => {
  await ctx.reply('Available commands:\n/start\n/help\n/ping');
});

bot.command('ping', async (ctx) => {
  await ctx.reply('pong 🟢');
});

// Basic error handling
bot.catch((err) => {
  console.error('Bot error:', err);
});

bot.launch().then(() => console.log('Bot started ✅'));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
