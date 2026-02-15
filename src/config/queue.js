const { Queue } = require("bullmq");
require("dotenv").config();

const connection = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
};

const notificationQueue = new Queue("notifications", { connection });

module.exports = { notificationQueue, connection };
