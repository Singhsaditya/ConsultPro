import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import projectRoutes from './routes/projects.js';
import clientRoutes from './routes/clients.js';
import contactRoutes from './routes/contacts.js';
import subscriberRoutes from './routes/subscribers.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB error:', err));

// Routes
app.use('/projects', projectRoutes);
app.use('/clients', clientRoutes);
app.use('/contacts', contactRoutes);
app.use('/subscribers', subscriberRoutes);

app.get('/', (req, res) => {
  res.send('ConsultPro Backend Running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
