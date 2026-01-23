import app from './app';
import { startKafkaConsumer } from './kafka-consumer';

const PORT = process.env.PORT || 3008;

app.listen(PORT, async () => {
  console.log(`📊 Report Service running on port ${PORT}`);
  await startKafkaConsumer();
});
