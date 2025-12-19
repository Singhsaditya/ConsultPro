import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// GET contacts
router.get('/', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// ADD contact
router.post('/', async (req, res) => {
  const contact = await Contact.create(req.body);
  res.json(contact);
});

export default router;
