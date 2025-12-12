import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to load bookings", error: error.message });
  }
});

router.post("/", async (req, res) => {
  const payload = req.body || {};
  const bookingId = payload.bookingId || `BKG-${Date.now()}`;

  try {
    const booking = await Booking.create({ ...payload, bookingId });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: "Unable to create booking", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(400).json({ message: "Unable to delete booking", error: error.message });
  }
});

router.get("/:id/ticket", async (req, res) => {
  try {
    const booking =
      (await Booking.findById(req.params.id)) ||
      (await Booking.findOne({ bookingId: req.params.id }));
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const taxes = Math.round((booking.price || 0) * 0.12);
    const total = (booking.price || 0) + taxes;

    res.json({
      bookingId: booking.bookingId,
      passengerName: booking.passengerName,
      operator: booking.operator,
      mode: booking.mode,
      route: booking.mode === "hotel" ? booking.city : `${booking.from} → ${booking.to}`,
      travelDate: booking.travelDate,
      bill: {
        base: booking.price || 0,
        taxes,
        total
      },
      issuedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(400).json({ message: "Unable to generate ticket", error: error.message });
  }
});

export default router;



