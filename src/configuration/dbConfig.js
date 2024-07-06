const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://prateek10:s9TagaJj4NsXRKoh@gymkhana.unvj6or.mongodb.net/?retryWrites=true&w=majority&appName=GymKhana",
  {
    serverSelectionTimeoutMS: 5000,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log(`MongoDB connection error: ${err}`);
});

module.exports = mongoose;
