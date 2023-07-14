const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Route-1 Admin signup "http://localhost:5000/api/auth/admin/createadmin"
router.post("/createadmin", async (req, res) => {
  try {
    let success = false;
    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      return res.status(400).json({ error: "This email is already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(req.body.password, salt);
    admin = await Admin.create({
      email: req.body.email,
      password: newPass,
    });

    const data = {
      id: admin._id,
    };

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true;

    return res.status(200).json({ success, authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

// Route-2 Admin login "http://localhost:5000/api/auth/admin/login"   auth-token required
router.post("/login", async (req, res) => {
  try {
    let success = false;
    let admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      return res.status(400).json({ error: "Please Enter correct credential" });
    }
    const passComp = await bcrypt.compare(req.body.password, admin.password);
    if(!passComp)
    {
        return res.status(400).json({ error: "Please Enter correct credential" });

    }
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send("please authenciate using valid token ");
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log(error.message);
      return res.status(401).send("please authenciate using valid token ");
    }
    success = true;

    return res.status(200).json({ success, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

module.exports = router;
