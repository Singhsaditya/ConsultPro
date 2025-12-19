import express from 'express';
import Subscriber from '../models/Subscriber.js';

const router = express.Router();

// GET subscribers
router.get('/', async (req, res) => {
  const subscribers = await Subscriber.find();
  res.json(subscribers);
});

// ADD subscriber
router.post('/', async (req, res) => {
  const subscriber = await Subscriber.create(req.body);
  res.json(subscriber);
});

export default router;
