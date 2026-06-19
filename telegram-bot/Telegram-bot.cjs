const { Bot, InlineKeyboard } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);
const ADMIN_ID = 1570052907; // Your admin ID

// Store messages and banned users
const userMessages = new Map(); // userId => array of messages
const bannedUsers = new Set(); // banned user IDs
let adminReplyingTo = null; // Current user admin is replying to

// Helper: Get user messages
function getUserMessages(userId) {
  if (!userMessages.has(userId)) {
    userMessages.set(userId, []);
  }
  return userMessages.get(userId);
}

// Handle messages
bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  // Check if user is banned
  if (bannedUsers.has(userId) && userId !== ADMIN_ID) {
    await ctx.reply(" You have been banned from using this bot.");
    return;
  }

  // USER sends message
  if (userId !== ADMIN_ID) {
    // Store message
    const messages = getUserMessages(userId);
    messages.push({
      text: text,
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    // Get user name
    let userName = 'User';
    try {
      const userInfo = await bot.api.getChat(userId);
      userName = userInfo.first_name || 'User';
    } catch (e) {}

    // Send to admin with buttons
    const keyboard = new InlineKeyboard()
      .text(` Reply`, `reply_${userId}`)
      .text(` Ban`, `ban_${userId}`);

    await bot.api.sendMessage(
      ADMIN_ID,
      ` From: ${userName}\n🆔 ID: ${userId}\n\n ${text}`,
      { reply_markup: keyboard }
    );
    
    await ctx.reply(" Message sent! We'll respond shortly.");
    return;
  }

  // ADMIN sends message
  if (userId === ADMIN_ID) {
    // If admin is replying to someone
    if (adminReplyingTo) {
      try {
        await bot.api.sendMessage(adminReplyingTo, ` Admin: ${text}`);
        
        // Store admin message
        const messages = getUserMessages(adminReplyingTo);
        messages.push({
          text: `Admin: ${text}`,
          time: new Date().toLocaleTimeString(),
          date: new Date().toISOString(),
          isAdmin: true
        });

        await ctx.reply(` Sent to user ${adminReplyingTo}`);
        adminReplyingTo = null; // Clear reply mode
      } catch (err) {
        await ctx.reply(" Failed to send. User may have blocked the bot.");
        adminReplyingTo = null;
      }
    } else {
      await ctx.reply(
        "⚠️ Click 'Reply' button on a user's message first.\n\n" +
        "Or use: /reply [user_id] [message]"
      );
    }
  }
});

// Handle Reply button
bot.callbackQuery(/^reply_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    await ctx.answerCallbackQuery(" Only admin can reply");
    return;
  }

  const userId = ctx.match[1];
  
  if (bannedUsers.has(userId)) {
    await ctx.answerCallbackQuery(" User is banned!");
    return;
  }

  adminReplyingTo = userId;
  
  let userName = 'User';
  try {
    const userInfo = await bot.api.getChat(userId);
    userName = userInfo.first_name || 'User';
  } catch (e) {}

  await ctx.answerCallbackQuery(` Replying to ${userName}`);
  
  // Show chat history
  const messages = getUserMessages(userId);
  let history = ` Chat with ${userName}\n${'─'.repeat(30)}\n\n`;
  
  if (messages.length === 0) {
    history += "No messages yet.";
  } else {
    const recent = messages.slice(-5); // Last 5 messages
    for (const msg of recent) {
      const sender = msg.isAdmin ? ' Admin' : ' User';
      history += `${sender} (${msg.time}):\n${msg.text}\n\n`;
    }
  }
  
  history += `${'─'.repeat(30)}\n Type your reply now`;

  const cancelBtn = new InlineKeyboard().text(` Cancel`, `cancel_reply`);
  await ctx.reply(history, { reply_markup: cancelBtn });
});

// Handle Ban button
bot.callbackQuery(/^ban_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    await ctx.answerCallbackQuery(" Only admin can ban");
    return;
  }

  const userId = ctx.match[1];
  
  let userName = 'User';
  try {
    const userInfo = await bot.api.getChat(userId);
    userName = userInfo.first_name || 'User';
  } catch (e) {}

  if (bannedUsers.has(userId)) {
    await ctx.answerCallbackQuery(` ${userName} already banned`);
    return;
  }

  const confirmBtn = new InlineKeyboard()
    .text(` Yes, ban`, `confirm_ban_${userId}`)
    .text(` No`, `cancel_ban`);

  await ctx.answerCallbackQuery(` Confirm ban ${userName}`);
  await ctx.reply(
    ` Ban ${userName} (ID: ${userId})?\n\nThey won't be able to use the bot.`,
    { reply_markup: confirmBtn }
  );
});

// Confirm ban
bot.callbackQuery(/^confirm_ban_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const userId = ctx.match[1];
  
  let userName = 'User';
  try {
    const userInfo = await bot.api.getChat(userId);
    userName = userInfo.first_name || 'User';
  } catch (e) {}

  bannedUsers.add(userId);
  
  if (adminReplyingTo === userId) {
    adminReplyingTo = null;
  }

  await ctx.answerCallbackQuery(` ${userName} banned`);
  await ctx.reply(` ${userName} has been banned.`);

  try {
    await bot.api.sendMessage(
      userId,
      ` You have been banned from DASTORE Bot.\nContact: 089 78 43 18`
    );
  } catch (e) {}
});

// Cancel ban
bot.callbackQuery('cancel_ban', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  await ctx.answerCallbackQuery(" Cancelled");
  await ctx.reply(" Ban cancelled.");
});

// Cancel reply
bot.callbackQuery('cancel_reply', async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  adminReplyingTo = null;
  await ctx.answerCallbackQuery(" Cancelled");
  await ctx.reply(" Reply cancelled.");
});

// Start command
bot.command("start", async (ctx) => {
  const userId = ctx.from.id;

  if (bannedUsers.has(userId) && userId !== ADMIN_ID) {
    await ctx.reply(" You are banned.");
    return;
  }

  if (userId === ADMIN_ID) {
    await ctx.reply(
      ` Welcome Admin!\n\n` +
      `Commands:\n` +
      `/users - List all users\n` +
      `/reply [id] [msg] - Reply to user\n` +
      `/ban [id] - Ban user\n` +
      `/unban [id] - Unban user\n` +
      `/banned - List banned users\n` +
      `/stats - Bot statistics\n` +
      `/clear - Clear all messages\n\n` +
      ` Click "Reply" on any message to chat!`
    );
  } else {
    await ctx.reply(
      ` Welcome to DASTORE!\n\n` +
      `Send a message and we'll respond within 24 hours.\n` +
      ` Phone: 089 78 43 18`
    );
  }
});

// List all users
bot.command("users", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  if (userMessages.size === 0) {
    await ctx.reply(" No users yet.");
    return;
  }

  let list = ` Users:\n${'─'.repeat(30)}\n\n`;
  
  for (const [userId, msgs] of userMessages) {
    let name = 'Unknown';
    try {
      const info = await bot.api.getChat(userId);
      name = info.first_name || 'Unknown';
    } catch (e) {}
    
    const status = bannedUsers.has(userId) ? ' BANNED' : ' Active';
    const lastMsg = msgs[msgs.length - 1];
    list += ` ${name}\n`;
    list += `   ID: ${userId}\n`;
    list += `   Status: ${status}\n`;
    list += `   Messages: ${msgs.length}\n`;
    list += `   Last: ${lastMsg ? lastMsg.time : 'N/A'}\n\n`;
  }

  if (list.length > 4096) {
    await ctx.reply(" Too many users. Use /reply [id]");
  } else {
    await ctx.reply(list);
  }
});

// Reply command
bot.command("reply", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const args = ctx.message.text.split(' ');
  if (args.length < 3) {
    await ctx.reply("❌ Usage: /reply [user_id] [message]");
    return;
  }

  const userId = parseInt(args[1]);
  const message = args.slice(2).join(' ');

  if (bannedUsers.has(userId)) {
    await ctx.reply(` User ${userId} is banned.`);
    return;
  }

  try {
    await bot.api.sendMessage(userId, `📨 Admin: ${message}`);
    const messages = getUserMessages(userId);
    messages.push({
      text: `Admin: ${message}`,
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString(),
      isAdmin: true
    });
    await ctx.reply(` Sent to ${userId}`);
  } catch (err) {
    await ctx.reply(` Failed: ${err.message}`);
  }
});

// Ban command
bot.command("ban", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const args = ctx.message.text.split(' ');
  if (args.length < 2) {
    await ctx.reply(" Usage: /ban [user_id]");
    return;
  }

  const userId = parseInt(args[1]);
  
  if (userId === ADMIN_ID) {
    await ctx.reply(" Can't ban yourself!");
    return;
  }

  if (bannedUsers.has(userId)) {
    await ctx.reply(` User ${userId} already banned.`);
    return;
  }

  bannedUsers.add(userId);
  if (adminReplyingTo === userId) adminReplyingTo = null;
  
  await ctx.reply(` User ${userId} banned.`);
  
  try {
    await bot.api.sendMessage(userId, " You have been banned.");
  } catch (e) {}
});

// Unban command
bot.command("unban", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const args = ctx.message.text.split(' ');
  if (args.length < 2) {
    await ctx.reply(" Usage: /unban [user_id]");
    return;
  }

  const userId = parseInt(args[1]);
  
  if (!bannedUsers.has(userId)) {
    await ctx.reply(` User ${userId} is not banned.`);
    return;
  }

  bannedUsers.delete(userId);
  await ctx.reply(` User ${userId} unbanned.`);
  
  try {
    await bot.api.sendMessage(userId, " You have been unbanned!");
  } catch (e) {}
});

// List banned users
bot.command("banned", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  if (bannedUsers.size === 0) {
    await ctx.reply("📭 No banned users.");
    return;
  }

  let list = ` Banned Users:\n${'─'.repeat(30)}\n\n`;
  for (const userId of bannedUsers) {
    let name = 'Unknown';
    try {
      const info = await bot.api.getChat(userId);
      name = info.first_name || 'Unknown';
    } catch (e) {}
    list += ` ${name}\n   ID: ${userId}\n\n`;
  }
  await ctx.reply(list);
});

// Statistics
bot.command("stats", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  await ctx.reply(
    ` Statistics\n${'─'.repeat(30)}\n\n` +
    ` Users: ${userMessages.size}\n` +
    ` Banned: ${bannedUsers.size}\n` +
    ` Total messages: ${Array.from(userMessages.values()).reduce((sum, msgs) => sum + msgs.length, 0)}\n` +
    ` ${new Date().toLocaleString()}`
  );
});

// Clear all messages
bot.command("clear", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  
  const confirmBtn = new InlineKeyboard()
    .text(" Yes", "confirm_clear")
    .text(" No", "cancel_clear");

  await ctx.reply("⚠️ Clear all messages?", { reply_markup: confirmBtn });
});

bot.callbackQuery("confirm_clear", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  userMessages.clear();
  adminReplyingTo = null;
  await ctx.answerCallbackQuery(" Cleared");
  await ctx.reply(" All messages cleared.");
});

bot.callbackQuery("cancel_clear", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  await ctx.answerCallbackQuery("❌ Cancelled");
  await ctx.reply("❌ Cancelled.");
});

// Vue Dashboard API
bot.api.getMessages = async () => {
  const result = [];
  for (const [userId, messages] of userMessages) {
    let userName = 'Unknown';
    try {
      const info = await bot.api.getChat(userId);
      userName = info.first_name || 'Unknown';
    } catch (e) {}
    
    result.push({
      userId,
      userName,
      isBanned: bannedUsers.has(userId),
      messages: messages.slice(-50)
    });
  }
  return result;
};

bot.api.sendMessageFromVue = async (userId, text) => {
  if (bannedUsers.has(userId)) {
    return { success: false, error: "User is banned" };
  }

  try {
    await bot.api.sendMessage(userId, `📨 Admin: ${text}`);
    const messages = getUserMessages(userId);
    messages.push({
      text: `Admin: ${text}`,
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString(),
      isAdmin: true
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Start bot
console.log(" DASTORE Bot is running...");
console.log(` Admin ID: ${ADMIN_ID}`);
bot.start();