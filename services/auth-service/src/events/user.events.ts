import { connectRabbit } from '../rabbitmq';

export const publishUserCreated = async (user: any) => {
  const channel = await connectRabbit();
  const queue = 'user_created';
  await channel.assertQueue(queue, { durable: true });
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(user)));
  console.log('📤 Evento enviado a RabbitMQ:', user);
};
