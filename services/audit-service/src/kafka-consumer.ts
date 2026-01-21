import { Kafka } from 'kafkajs';
import { connectMongo, AuditModel } from './mongo';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

export const startKafkaConsumer = async () => {
  await connectMongo();

  const consumer = kafka.consumer({ groupId: 'audit-group' });
  await consumer.connect();

  const topics = [
    'reservation-created',
    'reservation-approved',
    'reservation-rejected',
    'user-created'
  ];

  for (const topic of topics) {
    await consumer.subscribe({ topic });
  }

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      await AuditModel.create({
        eventType: topic,
        payload: JSON.parse(message.value?.toString() || '{}'),
        service: topic.split('-')[0]
      });

      console.log(`📥 Audit stored: ${topic}`);
    }
  });
};
