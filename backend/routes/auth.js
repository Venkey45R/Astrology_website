const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authmiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

router.post("/google", async (req, res) => {
  const { email, name, photo } = req.body;

  if (!email || !name) {
    return res.status(400).json({
      message: "Email and name are required.",
    });
  }

  try {
    let user = await User.findOne({
      email: email,
    });

    if (!user) {
      user = new User({
        email: email,
        name: name,
        photo: photo,
        role: "user",
      });
      await user.save();

      const token = generateToken(user._id, user.role);
      return res.json({
        message: "success",
        id: user._id,
        token: token,
        role: user.role,
      });
    } else {
      user.name = name;
      user.photo = photo;
      await user.save();

      const token = generateToken(user._id, user.role);
      return res.json({
        message: "success",
        id: user._id,
        token: token,
        role: user.role,
      });
    }
  } catch (error) {
    console.error("Error during Google sign-in/sign-up:", error);
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});

router.get("/logout", (req, res) => {
  try {
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({
      message: "Failed to log out. Please try again.",
    });
  }
});

router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
