import express from 'express';
import Client from '../models/Client.js';

const router = express.Router();

// GET clients
router.get('/', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

// ADD client
router.post('/', async (req, res) => {
  const client = await Client.create(req.body);
  res.json(client);
});

// DELETE client
router.delete('/:id', async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
