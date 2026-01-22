import { ConsumeMessage } from 'amqplib';
import { connectRabbit } from '../rabbitmq';
import { pool } from '../db';

export const consumeUserCreated = async () => {
  const channel = await connectRabbit();
  const queue = 'user_created';

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;

    const user = JSON.parse(msg.content.toString());
    console.log('📥 Evento recibido en Notification:', user);

    await pool.query(
      `INSERT INTO notifications (user_id, message, read, created_at)
       VALUES ($1, $2, false, NOW())`,
      [user.id, `¡Bienvenido ${user.email}! Tu cuenta fue creada.`]
    );

    channel.ack(msg);
  });
};

