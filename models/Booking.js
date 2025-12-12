import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    mode: { type: String, enum: ["flight", "train", "car", "hotel"], required: true },
    operator: { type: String, required: true },
    number: { type: String },
    type: { type: String },
    from: { type: String },
    city: { type: String },
    to: { type: String },
    depart: { type: String },
    arrive: { type: String },
    passengerName: { type: String, required: true },
    travelDate: { type: String },
    nights: { type: Number },
    guests: { type: Number },
    price: { type: Number, required: true },
    meta: { type: mongoose.Schema.Types.Mixed }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

