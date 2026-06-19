const { Bot, InlineKeyboard } = require("grammy");
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);
const ADMIN_ID = 1570052907; // Your admin ID

// Store conversations per user
const conversations = new Map(); // userId => { messages: [], adminReplyingTo: null }
let allMessages = []; // For Vue dashboard

// Helper: Get or create user conversation
function getConversation(userId) {
  if (!conversations.has(userId)) {
    conversations.set(userId, {
      messages: [],
      adminReplyingTo: null
    });
  }
  return conversations.get(userId);
}

// Handle messages from users and admin
bot.on("message:text", async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;

  // USER sends message → forward to ADMIN
  if (userId !== ADMIN_ID) {
    const userConv = getConversation(userId);
    
    // Store user message
    userConv.messages.push({
      id: Date.now(),
      from: 'user',
      userId: userId,
      text: text,
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    // Store in global messages for Vue
    allMessages.push({
      id: Date.now(),
      userId: userId,
      text: text,
      from: 'user',
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    // Get user info if available
    let userName = 'Unknown';
    try {
      const userInfo = await bot.api.getChat(userId);
      userName = userInfo.first_name || 'Unknown';
    } catch (e) {}

    const keyboard = new InlineKeyboard()
      .text(` Reply to ${userName}`, `reply_${userId}`)
      .text(` History`, `history_${userId}`);

    await bot.api.sendMessage(
      ADMIN_ID,
      `📩 New Message from ${userName}\n🆔 User ID: ${userId}\n\n💬 ${text}`,
      { reply_markup: keyboard }
    );
    
    await ctx.reply("Message sent to admin! We'll respond shortly.");
    return;
  }

  // ADMIN sends message → forward to USER
  if (userId === ADMIN_ID) {
    // Check if admin is replying to someone
    let targetUserId = null;
    let targetUserName = 'User';

    // Find which user the admin is replying to
    for (const [uid, conv] of conversations) {
      if (conv.adminReplyingTo === ADMIN_ID) {
        targetUserId = uid;
        break;
      }
    }

    if (!targetUserId) {
      await ctx.reply(
        "Click the 'Reply' button on a user's message first.\n\n" +
        "Or use: /reply [user_id] [message]"
      );
      return;
    }

    try {
      // Send message to user
      await bot.api.sendMessage(targetUserId, ` Admin: ${text}`);

      // Store admin message in user's conversation
      const userConv = getConversation(targetUserId);
      userConv.messages.push({
        id: Date.now(),
        from: 'admin',
        userId: ADMIN_ID,
        text: text,
        time: new Date().toLocaleTimeString(),
        date: new Date().toISOString()
      });

      // Store in global messages for Vue
      allMessages.push({
        id: Date.now(),
        userId: targetUserId,
        text: text,
        from: 'admin',
        time: new Date().toLocaleTimeString(),
        date: new Date().toISOString()
      });

      await ctx.reply(`✅ Message sent to user ${targetUserId}`);
      
      // Reset admin reply mode
      userConv.adminReplyingTo = null;

      // Send conversation summary to admin
      await showConversationSummary(ctx, targetUserId);

    } catch (err) {
      console.error("Error sending message:", err);
      await ctx.reply("Failed to send. User may have blocked the bot.");
    }
  }
});

// Handle admin clicking Reply button
bot.callbackQuery(/^reply_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    await ctx.answerCallbackQuery(" Only admin can reply");
    return;
  }

  const userId = ctx.match[1];
  const userConv = getConversation(userId);
  userConv.adminReplyingTo = ADMIN_ID;

  // Get user name
  let userName = 'User';
  try {
    const userInfo = await bot.api.getChat(userId);
    userName = userInfo.first_name || 'User';
  } catch (e) {}

  await ctx.answerCallbackQuery(` Replying to ${userName}`);

  // Show conversation history
  await showConversationHistory(ctx, userId);
});

// Handle admin clicking History button
bot.callbackQuery(/^history_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    await ctx.answerCallbackQuery(" Only admin can view history");
    return;
  }

  const userId = ctx.match[1];
  await ctx.answerCallbackQuery(" Showing conversation history");
  await showConversationHistory(ctx, userId);
});

// Show conversation history to admin
async function showConversationHistory(ctx, userId) {
  const userConv = getConversation(userId);
  
  if (userConv.messages.length === 0) {
    await ctx.reply(`📭 No messages yet with user ${userId}`);
    return;
  }

  let history = ` Conversation History\n User: ${userId}\n${'─'.repeat(30)}\n\n`;
  
  // Show last 10 messages
  const recentMessages = userConv.messages.slice(-10);
  
  for (const msg of recentMessages) {
    const sender = msg.from === 'admin' ? '👤 Admin' : '👤 User';
    history += `${sender} (${msg.time}):\n${msg.text}\n\n`;
  }

  history += `\n${'─'.repeat(30)}\n Type your reply below`;

  const keyboard = new InlineKeyboard()
    .text(`↩️ Cancel Reply`, `cancel_${userId}`);

  await ctx.reply(history, { reply_markup: keyboard });
}

// Show conversation summary to admin after replying
async function showConversationSummary(ctx, userId) {
  const userConv = getConversation(userId);
  const lastMsg = userConv.messages[userConv.messages.length - 1];
  
  if (!lastMsg) return;

  // Get user name
  let userName = 'User';
  try {
    const userInfo = await bot.api.getChat(userId);
    userName = userInfo.first_name || 'User';
  } catch (e) {}

  const summary = ` Conversation with ${userName}\n` +
    ` Total messages: ${userConv.messages.length}\n` +
    ` Last message: ${lastMsg.time}\n\n` +
    ` Last exchange:\n` +
    `User: ${userConv.messages[userConv.messages.length - 2]?.text || 'N/A'}\n` +
    `Admin: ${userConv.messages[userConv.messages.length - 1]?.text || 'N/A'}`;

  await ctx.reply(summary);
}

// Handle cancel reply
bot.callbackQuery(/^cancel_(\d+)$/, async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    await ctx.answerCallbackQuery(" Only admin can cancel");
    return;
  }

  const userId = ctx.match[1];
  const userConv = getConversation(userId);
  userConv.adminReplyingTo = null;

  await ctx.answerCallbackQuery(" Reply cancelled");
  await ctx.reply(" Reply mode cancelled for this user");
});

// Start command
bot.command("start", async (ctx) => {
  if (ctx.from.id === ADMIN_ID) {
    await ctx.reply(
      ` Welcome Admin!\n\n` +
      ` Total conversations: ${conversations.size}\n` +
      ` Total messages: ${allMessages.length}\n\n` +
      `Commands:\n` +
      `/users - List all users who contacted you\n` +
      `/reply [user_id] [message] - Reply to a user\n` +
      `/history [user_id] - View conversation history\n` +
      `/stats - View bot statistics\n` +
      `/clearmessages - Clear message history\n\n` +
      ` Click "Reply" on any user message to start chatting!`
    );
  } else {
    await ctx.reply(
      ` Welcome to DASTORE!\n\n` +
      `Send a message and we'll respond within 24 hours.\n` +
      `📞 For urgent matters: 089 78 43 18`
    );
  }
});

// List all users command (admin only)
bot.command("users", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  if (conversations.size === 0) {
    await ctx.reply("📭 No users have contacted the bot yet.");
    return;
  }

  let userList = ` Users who contacted the bot:\n${'─'.repeat(30)}\n\n`;
  
  for (const [userId, conv] of conversations) {
    let userName = 'Unknown';
    try {
      const userInfo = await bot.api.getChat(userId);
      userName = userInfo.first_name || 'Unknown';
    } catch (e) {}
    
    const lastMsg = conv.messages[conv.messages.length - 1];
    userList += ` ${userName}\n`;
    userList += `   ID: ${userId}\n`;
    userList += `   Messages: ${conv.messages.length}\n`;
    userList += `   Last: ${lastMsg ? lastMsg.time : 'N/A'}\n\n`;
  }

  // Send in chunks if too long
  if (userList.length > 4096) {
    await ctx.reply(" Too many users. Use /reply [user_id] to chat.");
  } else {
    await ctx.reply(userList);
  }
});

// Manual reply command (admin only)
bot.command("reply", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const args = ctx.message.text.split(' ');
  if (args.length < 3) {
    await ctx.reply("❌ Usage: /reply [user_id] [message]\n\nExample: /reply 123456789 Hello user!");
    return;
  }

  const userId = parseInt(args[1]);
  const message = args.slice(2).join(' ');

  try {
    await bot.api.sendMessage(userId, ` Admin: ${message}`);
    
    // Store in conversation
    const userConv = getConversation(userId);
    userConv.messages.push({
      id: Date.now(),
      from: 'admin',
      userId: ADMIN_ID,
      text: message,
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    allMessages.push({
      id: Date.now(),
      userId: userId,
      text: message,
      from: 'admin',
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    await ctx.reply(` Message sent to user ${userId}`);
  } catch (err) {
    await ctx.reply(` Failed: ${err.message}`);
  }
});

// View history command (admin only)
bot.command("history", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const args = ctx.message.text.split(' ');
  if (args.length < 2) {
    await ctx.reply(" Usage: /history [user_id]");
    return;
  }

  const userId = parseInt(args[1]);
  await showConversationHistory(ctx, userId);
});

// Statistics command (admin only)
bot.command("stats", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;

  const stats = ` Bot Statistics\n${'─'.repeat(30)}\n\n` +
    ` Total users: ${conversations.size}\n` +
    ` Total messages: ${allMessages.length}\n` +
    ` Last update: ${new Date().toLocaleString()}\n\n` +
    ` Your Admin ID: ${ADMIN_ID}\n` +
    ` Bot running: `;

  await ctx.reply(stats);
});

// Clear messages command (admin only)
bot.command("clearmessages", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  
  const confirmKeyboard = new InlineKeyboard()
    .text(" Yes, clear all", "confirm_clear")
    .text(" Cancel", "cancel_clear");

  await ctx.reply(" Are you sure you want to clear all message history?", {
    reply_markup: confirmKeyboard
  });
});

// Handle clear confirmation
bot.callbackQuery("confirm_clear", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) {
    await ctx.answerCallbackQuery(" Only admin can do this");
    return;
  }

  allMessages = [];
  conversations.clear();
  await ctx.answerCallbackQuery("All messages cleared");
  await ctx.reply("All messages cleared from dashboard and conversations.");
});

bot.callbackQuery("cancel_clear", async (ctx) => {
  if (ctx.from.id !== ADMIN_ID) return;
  await ctx.answerCallbackQuery(" Cancelled");
  await ctx.reply(" Clear operation cancelled.");
});

// API endpoints for Vue dashboard
bot.api.getMessages = async () => {
  return allMessages.slice(-50); // Return last 50 messages
};

bot.api.getConversations = async () => {
  const result = [];
  for (const [userId, conv] of conversations) {
    let userName = 'Unknown';
    try {
      const userInfo = await bot.api.getChat(userId);
      userName = userInfo.first_name || 'Unknown';
    } catch (e) {}
    
    result.push({
      userId,
      userName,
      messageCount: conv.messages.length,
      lastMessage: conv.messages[conv.messages.length - 1] || null,
      messages: conv.messages.slice(-20) // Last 20 messages
    });
  }
  return result;
};

bot.api.sendMessageFromVue = async (userId, text) => {
  try {
    await bot.api.sendMessage(userId, `📨 Admin: ${text}`);
    
    // Store in conversation
    const userConv = getConversation(userId);
    userConv.messages.push({
      id: Date.now(),
      from: 'admin',
      userId: ADMIN_ID,
      text: text,
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    allMessages.push({
      id: Date.now(),
      userId: userId,
      text: text,
      from: 'admin',
      time: new Date().toLocaleTimeString(),
      date: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending from Vue:", error);
    return { success: false, error: error.message };
  }
};

// Start the bot
console.log(" DASTORE Bot is running...");
console.log(` Admin ID: ${ADMIN_ID}`);
console.log(` Dashboard shows real-time conversations`);
console.log(` Use /users to see all contacts`);

bot.start();