const express = require("express");
const router = express.Router();
const {
  registerUser,
  signinUser,
  resetPassword,
  getUserProfile,
} = require("../controllers/authController");
const { signupValidationRules, validate, signinValidationRules } = require("../utils/validator");
const { protect, admin } = require("../middlewares/authMiddleware");

// Signup
router.post("/signup", signupValidationRules(), validate, registerUser);

// Signin
router.post("/signin", signinValidationRules(), validate, signinUser);

//reset password
router.route("/reset-password").post(signinValidationRules(), validate, resetPassword);

//user profile
router.route("/profile").get(protect, getUserProfile);

module.exports = router;
