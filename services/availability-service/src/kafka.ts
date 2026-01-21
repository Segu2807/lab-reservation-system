import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

export const consumer = kafka.consumer({ groupId: 'availability-group' });
