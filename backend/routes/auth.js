const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authmiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

// Removed generateTokenAndSetCookie as it was for HTTP-only cookies with Passport.js
// const generateTokenAndSetCookie = (user, res) => { ... };

// Removed Passport.js initiation route
// router.get(
//   "/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// This is your desired direct POST route for Google sign-in/sign-up
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

// Removed Passport.js callback route
// router.get(
//   "/google/callback",
//   passport.authenticate("google", { ... }),
//   async (req, res) => { ... }
// );

// Keep the logout route as it is, as frontend will clear its own token
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

// Keep the protected /me route
router.get("/me", protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
