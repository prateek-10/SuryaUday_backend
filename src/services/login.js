const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");
const { verifyToken } = require("../utils/authMiddleware");

async function login(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found");
    }

    // Await the bcrypt comparison
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Incorrect Password");
    }

    const token = generateToken(existingUser);
    return token;
  } catch (error) {
    console.log("Login error:", error.message);
    throw new Error("Invalid Credentials");
  }
}

async function refreshToken(oldToken) {
  try {
    const decodedToken = verifyToken(oldToken);

    // Await the user retrieval
    const user = await User.findById(decodedToken._id);
    if (!user) {
      throw new Error("User not found");
    }

    const newToken = generateToken(user);
    return newToken;
  } catch (error) {
    console.log("Refresh token error:", error.message);
    throw new Error("Invalid token");
  }
}

module.exports = {
  login,
  refreshToken,
};
