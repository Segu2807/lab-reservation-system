import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092']
});

export const producer = kafka.producer();
