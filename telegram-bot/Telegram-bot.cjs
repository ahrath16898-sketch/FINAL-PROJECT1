const { Bot, InlineKeyboard } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

const ADMIN_ID = 1570052907;

// store active chat per admin
const chat = new Map();

/**
 * USER → ADMIN
 */
bot.on("message:text", async (ctx) => {
  if (ctx.from.id === ADMIN_ID) return;

  const userId = ctx.from.id;

  const keyboard = new InlineKeyboard().text(
    "Reply ",
    `reply_${userId}`
  );

  await ctx.api.sendMessage(
    ADMIN_ID,
    `📩 Message\n🆔 ${userId}\n\n💬 ${ctx.message.text}`,
    { reply_markup: keyboard }
  );
});

/**
 * ADMIN CLICK REPLY
 */
bot.callbackQuery(/^reply_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const userId = ctx.match[1];

  chat.set("admin", userId);

  await ctx.answerCallbackQuery();
  await ctx.reply("✍️ Type your reply now");
});

/**
 * ADMIN SEND MESSAGE
 */
bot.on("message:text", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const target = chat.get("admin");

  if (!target) {
    return ctx.reply("⚠️ Click Reply first");
  }

  try {
    await ctx.api.sendMessage(target, `💬 Admin: ${ctx.message.text}`);
    await ctx.reply("✅ Sent");
  } catch (err) {
    console.log(err);
    await ctx.reply("❌ Failed (user blocked bot or didn't start)");
  }

  chat.delete("admin");
});

bot.start();
console.log("🤖 Bot running...");