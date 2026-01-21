import app from './app';

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`⏰ Availability Service running on port ${PORT}`);
});

import { consumer } from './kafka';
import { pool } from './db';

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'reservation-created' });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const reservation = JSON.parse(message.value!.toString());

      const timeSlot = `${reservation.start_time}-${reservation.end_time}`;

      await pool.query(
        `INSERT INTO availability (lab_id, date, time_slot)
         VALUES ($1,$2,$3)`,
        [reservation.lab_id, reservation.date, timeSlot]
      );
    }
  });
})();
