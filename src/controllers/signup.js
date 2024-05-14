const userService = require("../services/signup");
const User = require("../models/user");

async function createUser(req, res) {
  try {
    const userData = req.body;
    const { email } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await userService.createUser(userData);
    res.status(201).json({ user: user, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

module.exports = { createUser };
