require('dotenv').config();
const mongoose = require("mongoose");
const {mongostring} = require('../config/serverconfig.js');

const uri = mongostring;

const connect = async () => {
  if (!uri) {
    console.error("MongoDB connection string is missing!");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Mongodb is successfully connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

module.exports = { connect };
