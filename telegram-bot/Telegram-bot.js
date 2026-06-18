const { Bot } = require("grammy");
require('dotenv').config({ path: './bot.env' });

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  console.error("❌ Error: BOT_TOKEN not found in bot.env file!");
  process.exit(1);
}

const bot = new Bot(BOT_TOKEN);

// Store user messages for contact form
const userMessages = {};

// Handle /start command
bot.command("start", (ctx) => {
  const welcomeMessage = `👋 Welcome to DASTORE Bot!

🌱 Fresh vegetables delivered to your door!

Commands:
/start - Welcome message
/help - Show help menu
/contact - Contact us
/order - Place an order
/about - About DASTORE
/feedback - Send feedback

📞 For urgent matters, contact us directly:
Phone: 089 78 43 18
Email: dastore@gmail.com`;

  ctx.reply(welcomeMessage);
});

// Handle /help command
bot.command("help", (ctx) => {
  ctx.reply(`🤖 DASTORE Bot Commands:

/start - Welcome message
/help - Show this help menu
/contact - Contact us form
/order - Place an order
/about - About DASTORE
/feedback - Send feedback
/menu - Interactive menu

📞 Contact: 089 78 43 18
📍 Phnom Penh, Cambodia`);
});

// Handle /contact command
bot.command("contact", (ctx) => {
  const contactMessage = `📞 Contact DASTORE

📍 Address: Phnom Penh, Cambodia
📱 Phone: 089 78 43 18
📧 Email: dastore@gmail.com
🕐 Hours: 7:00 AM - 8:00 PM

Click the button below to send us a message!`;

  ctx.reply(contactMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📩 Send Message", callback_data: "send_message" },
          { text: "📞 Call Now", url: "tel:+85589784318" }
        ],
        [
          { text: "📍 Visit Website", url: "https://t.me/sell_ProductBot" },
          { text: "📧 Email Us", callback_data: "email_us" }
        ]
      ]
    }
  });
});

// Handle /order command
bot.command("order", (ctx) => {
  ctx.reply(`🛒 Place Your Order

How to order:
1. Send us what vegetables you want
2. Specify quantity
3. Provide delivery address
4. We'll confirm and deliver!

Example: "I want 2kg of carrots, 1kg of tomatoes, deliver to Street 123, Phnom Penh"

Type your order now!`);
});

// Handle /about command
bot.command("about", (ctx) => {
  ctx.reply(`🌱 About DASTORE

We are a fresh vegetable store providing 100% organic vegetables directly from our farms to your table.

✅ 100% Organic
✅ No chemicals
✅ Fresh daily
✅ Free delivery for orders over 50,000៛

📍 Location: Phnom Penh, Cambodia
📱 Phone: 089 78 43 18
📧 Email: dastore@gmail.com

Visit us at: @sell_ProductBot`);
});

// Handle /feedback command
bot.command("feedback", (ctx) => {
  ctx.reply(`📝 Send Feedback

We value your opinion! Please send us your feedback about:
- Product quality
- Delivery service
- Our website
- Suggestions for improvement

Type your feedback below. We'll respond within 24 hours!`);
});

// Handle /menu command
bot.command("menu", (ctx) => {
  ctx.reply("📋 DASTORE Menu", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "🌿 Vegetables", callback_data: "vegetables" },
          { text: "🍅 Fruits", callback_data: "fruits" }
        ],
        [
          { text: "🌱 Organic", callback_data: "organic" },
          { text: "🥬 Specials", callback_data: "specials" }
        ],
        [
          { text: "📞 Contact Us", callback_data: "contact_us" },
          { text: "📍 Location", callback_data: "location" }
        ]
      ]
    }
  });
});

// Handle callback queries (button clicks)
bot.on("callback_query:data", async (ctx) => {
  const choice = ctx.callbackQuery.data;
  await ctx.answerCallbackQuery();

  switch(choice) {
    case "send_message":
      ctx.reply(`📩 Send us a message!

Type your message below and we'll respond within 24 hours.

Please include:
- Your name
- Your phone number
- Your message

Example:
"Name: Sokha
Phone: 089 78 43 18
Message: I want to order vegetables"`);
      break;

    case "email_us":
      ctx.reply(`📧 Email: dastore@gmail.com

We'll respond within 24 hours!`);
      break;

    case "contact_us":
      ctx.reply(`📞 Contact DASTORE

📍 Address: Phnom Penh, Cambodia
📱 Phone: 089 78 43 18
📧 Email: dastore@gmail.com
🕐 Hours: 7:00 AM - 8:00 PM

How can we help you?`);
      break;

    case "location":
      ctx.reply(`📍 Our Location

Phnom Penh, Cambodia

We deliver to all areas in Phnom Penh!
Free delivery for orders over 50,000៛`);
      break;

    case "vegetables":
      ctx.reply(`🌿 Our Vegetables

We have over 100+ types of fresh vegetables:
- Carrots
- Tomatoes
- Cabbage
- Lettuce
- Spinach
- Cucumbers
- And many more!

All 100% organic!`);
      break;

    case "fruits":
      ctx.reply(`🍅 Our Fruits

Fresh fruits available:
- Mangoes
- Bananas
- Papayas
- Watermelons
- And more!

Seasonal fruits available!`);
      break;

    case "organic":
      ctx.reply(`🌱 100% Organic

Our vegetables are:
✅ No chemicals
✅ No pesticides
✅ Natural fertilizers
✅ Fresh from farm

Healthier for you and your family!`);
      break;

    case "specials":
      ctx.reply(`🥬 Weekly Specials

Check our website for weekly specials!
Fresh vegetables at discounted prices.

Visit: @sell_ProductBot`);
      break;

    default:
      ctx.reply("Please use the menu options.");
  }
});

// Handle text messages
bot.on("message:text", (ctx) => {
  const text = ctx.message.text;
  const userId = ctx.from.id;

  // Don't reply to commands
  if (text.startsWith("/")) return;

  // Store user message
  if (!userMessages[userId]) {
    userMessages[userId] = [];
  }
  userMessages[userId].push({
    message: text,
    date: new Date().toISOString()
  });

  // Reply based on message content
  if (text.toLowerCase().includes("order") || text.toLowerCase().includes("បញ្ជា")) {
    ctx.reply(`🛒 Thank you for your order!

We've received your message. Our team will contact you within 30 minutes to confirm your order.

For urgent orders, call: 089 78 43 18`);
  } 
  else if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi") || text.toLowerCase().includes("សួស្តី")) {
    ctx.reply(`👋 Hello! Welcome to DASTORE!

How can we help you today?
- Type /help for commands
- Type /order to place an order
- Type /contact to contact us`);
  }
  else if (text.toLowerCase().includes("thank") || text.toLowerCase().includes("អរគុណ")) {
    ctx.reply(`🙏 You're welcome!

Thank you for choosing DASTORE!
We appreciate your trust in us.

Visit us again! 🌱`);
  }
  else {
    ctx.reply(`📩 Thank you for your message!

We'll respond within 24 hours.

For urgent matters, call: 089 78 43 18

🌱 DASTORE - Fresh Vegetables Every Day!`);
  }
});

// Handle errors
bot.catch((error) => {
  console.error("❌ Bot error:", error);
});

// Start the bot
console.log("🤖 DASTORE Bot Starting...");
bot.start();
console.log("✅ DASTORE Bot is running!");
console.log(`📱 Bot username: @sell_ProductBot`);
console.log(`📍 Visit: https://t.me/sell_ProductBot`);