const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("error occured" + error);
    process.exit(1);
  }
};

module.exports = { connectToMongoDB };
