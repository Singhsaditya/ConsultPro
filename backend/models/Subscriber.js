import mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      default: 'Active',
    },
  },
  { timestamps: true }
);

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
export default Subscriber;
