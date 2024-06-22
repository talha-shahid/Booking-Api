import Booking from "../models/booking.js";

export const getSchedule = async (req, res) => {
  const { week } = req.query;

  try {
    const bookings = await Booking.find({
      start_at: { $gte: new Date(week) },
    }).populate("user agent");
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error fetching schedule" });
  }
};

export const businessScheduler = (req, res) => {
  res.status(200).send("OK");
};
