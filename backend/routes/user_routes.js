const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Route-1 create user "http://localhost:5000/api/auth/user/createuser"
router.post("/createuser", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "This email is already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPass,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-2 login user "http://localhost:5000/api/auth/user/login"
router.post("/login", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    const passComp = await bcrypt.compare(req.body.password, user.password);
    if (!user || !passComp) {
      return res.status(400).json({ error: "Please Enter correct credential" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-3 Update user "http://localhost:5000/api/auth/user/updateuser"
router.put("/updateuser/:id", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let userID = req.params.id;
    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, salt);
    let user = await User.findByIdAndUpdate(userID, {
      name,
      email,
      password: newPass,
    });
    user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-4 Delete user "http://localhost:5000/api/auth/user/delete"
router.delete("/delete/:id", async (req, res) => {
  try {
    let userID = req.params.id;
    let user = await User.findByIdAndDelete(userID);
    if (!user) {
      return res.status(400).json({ error: "Invalid Id" });
    }
    return res.status(200).json({ message: "Deleted User Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-5 get all user "http://localhost:5000/api/auth/user/getalluser"
router.get("/getalluser", async (req, res) => {
  try {
    let user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
