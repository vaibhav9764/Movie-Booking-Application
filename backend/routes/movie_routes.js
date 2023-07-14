const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

// Route-1 Add Movie "http://localhost:5000/api/movies/addmovie"   auth-token required
router.post("/addmovie", async (req, res) => {
  let success = false;
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send("please authenciate using valid token ");
  }

  //   verify the token
  let adminId;
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    adminId = data.id;
  } catch (error) {
    console.log(error.message);
    return res.status(401).send("please authenciate using valid token ");
  }

  try {
    const { title, description, releaseDate, posterUrl, featured, actors } =
      req.body;
    let movie = new Movie({
      title,
      description,
      actors,
      releaseDate: new Date(`${releaseDate}`),
      posterUrl,
      featured,
      admin: adminId,
    });

    const session=await mongoose.startSession();
    const admin =await Admin.findById(adminId);
    session.startTransaction();
    await movie.save(session);
    admin.addMovies.push(movie);
    await admin.save(session);
    await session.commitTransaction();

    success = true;

    return res.status(200).json({ success, movie });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-2 Get All Movie "http://localhost:5000/api/movies/getallmovies"
router.get("/getallmovies", async (req, res) => {
  let movie;

  try {
    movie = await Movie.find();
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-3 Get Movie by ID "http://localhost:5000/api/movies/getmovie/:id"
router.get("/getmovie/:id", async (req, res) => {
  let movie;
  let movieId = req.params.id;

  try {
    movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(401).send("Not Found");
    }
    return res.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
