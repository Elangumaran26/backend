require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));
app.use(express.json());

// temporary storage (later we add DB)
let bookings = [];

// test route
app.get("/", (req, res) => {
  res.send("FixDoor Backend Running 🚀");
});

// SAVE booking
app.post("/booking", (req, res) => {
  const booking = req.body;
  booking.id = Date.now(); // simple unique id
  bookings.push(booking);

  console.log("New booking:", booking);
  res.json({ success: true, message: "Booking saved" });
});

// GET all bookings (for technician)
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});