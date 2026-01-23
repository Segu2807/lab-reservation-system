import app from './app';
import { startKafkaConsumer } from './kafka-consumer';

const PORT = process.env.PORT || 3006;

app.listen(PORT, async () => {
  console.log(`✅ Audit Service running on port ${PORT}`);
  await startKafkaConsumer();
});
