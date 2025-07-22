export default () => ({
  server: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 5000,
  },
  database: {
    mongodb_connection_url: process.env.MONGODB_CONNECTION_URL,
  },
  telegram: {
    bot: {
      token: process.env.TELEGRAM_BOT_TOKEN,
      webhookURL: process.env.TELEGRAM_WEBHOOK_URL,
    },
  },
});
