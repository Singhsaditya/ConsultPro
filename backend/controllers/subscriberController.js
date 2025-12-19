import Subscriber from '../models/Subscriber.js';

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch {
    res.status(500).json({ message: 'Failed to fetch subscribers' });
  }
};

export const addSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.create(req.body);
    res.status(201).json(subscriber);
  } catch {
    res.status(400).json({ message: 'Already subscribed or invalid email' });
  }
};
