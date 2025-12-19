import Contact from '../models/Contact.js';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch {
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch {
    res.status(400).json({ message: 'Failed to submit contact form' });
  }
};
