import { Kafka } from 'kafkajs';
import { pool, initDB } from './db';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

export const startKafkaConsumer = async () => {
  await initDB();

  const consumer = kafka.consumer({ groupId: 'report-group' });
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
      const data = JSON.parse(message.value?.toString() || '{}');

      await pool.query(
        `INSERT INTO reservation_reports
         (reservation_id, lab_id, user_id, status, date)
         VALUES ($1, $2, $3, $4, CURRENT_DATE)`,
        [
          data.reservationId,
          data.labId,
          data.userId,
          topic.replace('reservation-', '')
        ]
      );

      console.log(`📊 Report updated: ${topic}`);
    }
  });
};
