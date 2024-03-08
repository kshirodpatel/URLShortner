const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");

connectToMongoDB();

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
