import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();

//  CONNECT DATABASE
connectDB();

// middleware
app.use(cors());
app.use(express.json());

import projectRoutes from './routes/projectRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';

app.use('/api/projects', projectRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/subscribers', subscriberRoutes);


// test route
app.get('/', (req, res) => {
  res.send('ConsultPro Backend is running 🚀');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
