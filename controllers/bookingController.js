import Booking from '../models/booking.js';
import User from '../models/user.js';
import Agent from '../models/agent.js';

//get schedule
export const getSchedule = async (req, res) => {
  const { week } = req.query;

  try {
    const startDate = new Date(week);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 7);

    const bookings = await Booking.find({
      start_at: { $gte: startDate, $lt: endDate }
    }).populate('user agent');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching schedule' });
  }
};


export const createBooking = async (req, res) => {
  const { userId, start_at, finish_at } = req.body;
  const agentId = req.agent._id;

  try {
    const user = await User.findById(userId);
    const agent = await Agent.findById(agentId);

    if (!user || !agent) return res.status(400).json({ error: 'Invalid user or agent' });

    const booking = new Booking({ user: userId, agent: agentId, start_at, finish_at });
    await booking.save();

    user.bookings.push(booking);
    agent.bookings.push(booking);

    await user.save();
    await agent.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Error creating booking' });
  }
};

export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking' });
  }
};
