const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Movie = require("../models/Movie");
const User = require("../models/User");
const mongoose = require("mongoose");

// Route-1 New Booking "http://localhost:5000/api/movies/booking/newbooking"
router.post("/newbooking", async (req, res) => {
  const { movie, date, seatNumber, user } = req.body;
  let success = false;
  let newBooking;
  let existingUser;
  let existingMovie;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
    if (!existingMovie) {
      return res.status(404).json({ success, message: "Movie Not found " });
    }
    if (!existingUser) {
      return res.status(404).json({ success, message: "User Not found " });
    }
  } catch (error) {
    return console.log(error);
  }
  try {
    newBooking = new Booking({
      movie,
      date,
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBooking.save(session);
    existingMovie.bookings.push(newBooking);
    existingUser.booking.push(newBooking);
    await existingMovie.save(session);
    await existingUser.save(session);
    await session.commitTransaction();

    if (!newBooking) {
      return res
        .status(401)
        .json({ success, message: "Unable to create Booking" });
    }
    success = true;
    return res.status(200).json({ success, newBooking });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-2 Get Booking by ID "http://localhost:5000/api/movies/booking/getbooking/:id"
router.get("/getbooking/:id", async (req, res) => {
  let bookingID = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(bookingID);
    if (!booking) {
      return res.status(401).json({ success, message: "Not Found" });
    }
    success = true;
    return res.status(200).json({ success, booking });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-3 Get Booking by ID "http://localhost:5000/api/movies/booking/delete/:id"
router.delete("/delete/:id", async (req, res) => {
  let bookingID = req.params.id;
  let existingBooking;
  try {
    existingBooking = await Booking.findByIdAndRemove(bookingID).populate(
      "user movie"
    );

    const session = await mongoose.startSession();
    session.startTransaction();
    existingBooking.user.booking.pull(existingBooking);
    existingBooking.movie.bookings.pull(existingBooking);
    await existingBooking.user.save(session);
    await existingBooking.movie.save(session);
    await session.commitTransaction();

    success = true;
    return res
      .status(200)
      .json({ success, message: "Booking Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-4 Get all Booking of User "http://localhost:5000/api/movies/booking/getallbooking/:id"
router.get("/getallbooking/:id", async (req, res) => {
  let userID = req.params.id;
  let existingBooking;
  try {
    existingBooking = await Booking.find({ user: userID });
    if (!existingBooking) {
      return res.status(401).json({ message: "No Booking availble" });
    }

    success = true;
    return res.status(200).json({booking:existingBooking });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
