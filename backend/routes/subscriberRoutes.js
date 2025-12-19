import express from 'express';
import {
  getSubscribers,
  addSubscriber,
} from '../controllers/subscriberController.js';

const router = express.Router();

router.get('/', getSubscribers);
router.post('/', addSubscriber);

export default router;
