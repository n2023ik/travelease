import express from "express";
import crypto from "crypto";
import User from "../models/User.js";

const router = express.Router();

const generatePassword = () =>
  crypto.randomBytes(6).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 10);

router.post("/register", async (req, res) => {
  const { name = "Traveler", email, password } = req.body || {};
  if (!email) return res.status(400).json({ message: "Email is required" });

  const rawPassword = password && password.trim() ? password.trim() : generatePassword();
  const passwordHash = User.hashPassword(rawPassword);

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { name, passwordHash },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      message: "Account ready. Save this password to login.",
      email: user.email,
      name: user.name,
      password: rawPassword
    });
  } catch (error) {
    res.status(500).json({ message: "Unable to register", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const hash = User.hashPassword(password);
    if (hash !== user.passwordHash) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Unable to login", error: error.message });
  }
});

export default router;

