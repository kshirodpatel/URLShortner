const User = require("../models/user");

const handleUserSignup = async (req, res) => {
  const body = req.body;

  if (!body || !body.name || !body.email || !body.password) {
    res.status(400).json({
      status: "error",
      message: "Please enter all the fields",
    });
  }

  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });

  console.log(newUser);
};

const handleUserLogin = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "User Login Route",
  });
};

module.exports = { handleUserSignup, handleUserLogin };
