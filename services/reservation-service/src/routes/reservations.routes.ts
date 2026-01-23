import { Router } from 'express';
import { pool } from '../db';
import { producer } from '../kafka';
import axios from 'axios';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestión de reservas
 */

/**
 * @swagger
 * /reservations/me:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/me', async (_req, res) => {
  const { rows } = await pool.query(
    'SELECT * FROM reservations ORDER BY created_at DESC'
  );
  res.json(rows);
});

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - labId
 *               - date
 *               - startTime
 *               - endTime
 *             properties:
 *               labId:
 *                 type: integer
 *               date:
 *                 type: string
 *                 example: 2026-01-25
 *               startTime:
 *                 type: string
 *                 example: "08:00"
 *               endTime:
 *                 type: string
 *                 example: "10:00"
 *     responses:
 *       201:
 *         description: Reserva creada
 */
router.post('/', async (req, res) => {
  const { labId, date, startTime, endTime } = req.body;

  const { rows } = await pool.query(
    `INSERT INTO reservations
     (lab_id, date, start_time, end_time, status)
     VALUES ($1,$2,$3,$4,'PENDING')
     RETURNING *`,
    [labId, date, startTime, endTime]
  );

  const reservation = rows[0];

  // 🔹 Kafka
  await producer.connect();
  await producer.send({
    topic: 'reservation-created',
    messages: [{ value: JSON.stringify(reservation) }]
  });
  await producer.disconnect();

  // 🔹 n8n webhook
  await axios.post(
    'http://n8n:5678/webhook/reservation-created',
    reservation
  );

  res.status(201).json(reservation);
});

export default router;

