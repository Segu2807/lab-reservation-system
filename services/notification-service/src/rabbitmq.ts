import amqplib, { Channel } from 'amqplib';

const RABBIT_URL =
  process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672';

let channel: Channel;

export const connectRabbit = async (): Promise<Channel> => {
  if (channel) return channel;

  const connection = await amqplib.connect(RABBIT_URL);
  channel = await connection.createChannel();

  console.log('🔗 RabbitMQ conectado (notification-service)');
  return channel;
};
