import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: { type: String, enum: ['ADMIN', 'REGULAR'], default: 'REGULAR' },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;