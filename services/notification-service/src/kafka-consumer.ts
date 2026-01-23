import { Kafka } from 'kafkajs';
import { pool, initDB } from './db';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

export const startKafkaConsumer = async () => {
  await initDB();

  const consumer = kafka.consumer({ groupId: 'notification-group' });
  await consumer.connect();

  const topics = [
    'reservation-created',
    'reservation-approved',
    'reservation-rejected'
  ];

  for (const topic of topics) {
    await consumer.subscribe({ topic });
  }

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const payload = JSON.parse(message.value?.toString() || '{}');

      await pool.query(
        `INSERT INTO notifications (user_id, message, type)
         VALUES ($1, $2, $3)`,
        [
          payload.userId || null,
          `Evento ${topic} ocurrido`,
          topic
        ]
      );

      console.log(`🔔 Notification stored: ${topic}`);
    }
  });
};
