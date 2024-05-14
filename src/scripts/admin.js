const User = require("../models/user");
const bcrypt = require("bcrypt");

async function createAdminAccount() {
  try {
    const existingAdmin = await User.findOne({
      email: "prateeksibu333@gmail.com",
    });
    if (!existingAdmin) {
      const newAdmin = new User({
        name: "Prateek",
        email: "prateeksibu333@gmail.com",
        password: await bcrypt.hash("Sibu@2001", 10),
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin account created successfully");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = createAdminAccount;
