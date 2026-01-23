import amqplib from 'amqplib';

const RABBIT_URL = process.env.RABBIT_URL || 'amqp://guest:guest@localhost:5672';

let channel: amqplib.Channel;

export const connectRabbit = async (): Promise<amqplib.Channel> => {
  if (channel) return channel;

  const connection = await amqplib.connect(RABBIT_URL);
  channel = await connection.createChannel();
  console.log('🔗 Conectado a RabbitMQ');
  return channel;
};
