const express = require("express");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT || 6000;
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");
const User = require("./models/user");
const { connectToMongoDB } = require("./connect");
const path = require("path");

connectToMongoDB();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
