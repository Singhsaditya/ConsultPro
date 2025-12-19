import Client from '../models/Client.js';

export const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch {
    res.status(500).json({ message: 'Failed to fetch clients' });
  }
};

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch {
    res.status(400).json({ message: 'Failed to create client' });
  }
};

export const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: 'Client deleted' });
  } catch {
    res.status(400).json({ message: 'Failed to delete client' });
  }
};
