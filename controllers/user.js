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

  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render("login", { error: "Invalid Username or Password" });
  }

  return res.redirect("/");
};

module.exports = { handleUserSignup, handleUserLogin };
