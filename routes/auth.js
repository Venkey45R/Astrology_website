// routes/auth.js
const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authmiddleware");
const generateToken = require("../utils/generateToken");

const router = express.Router();

const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "Lax",
  });
};

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
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

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    session: false,
  }),
  async (req, res) => {
    try {
      const { id, displayName, photos, emails } = req.user;

      let user = await User.findOne({
        email: emails[0].value,
      });

      if (user) {
        user.name = displayName;
        user.photo = photos[0].value;
        await user.save();
      } else {
        user = await User.create({
          name: displayName,
          email: emails[0].value,
          photo: photos[0].value,
          role: "user",
        });
      }

      generateTokenAndSetCookie(user, res);

      res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    } catch (error) {
      console.error("Error during Google OAuth callback:", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
  }
);

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
