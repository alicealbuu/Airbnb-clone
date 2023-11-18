const express = require("express");
const router = express.Router();
const { bookPlace, getBookings } = require("../controllers/bookingController");

router.post("/bookings", bookPlace);
router.get("/bookings", getBookings);

module.exports = router;
