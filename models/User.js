import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

// Simple helper to hash passwords consistently
userSchema.statics.hashPassword = function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
};

export default mongoose.model("User", userSchema);

