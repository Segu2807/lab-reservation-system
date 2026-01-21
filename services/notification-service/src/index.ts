import app from './app';
import { startKafkaConsumer } from './kafka-consumer';

const PORT = process.env.PORT || 3007;

app.listen(PORT, async () => {
  console.log(`🔔 Notification Service running on port ${PORT}`);
  await startKafkaConsumer();
});
