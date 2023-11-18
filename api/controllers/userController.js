const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//1. Register new user //route POST/register // Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json(user);
  } catch (e) {
    res.status(422).json(e);
  }
};

//2. Login new user //route POST/login // Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Check for user email
    const user = await User.findOne({ email });

    //Check password
    if (user) {
      const passOk = await bcrypt.compare(password, user.password);

      if (passOk) {
        jwt.sign(
          {
            email: user.email,
            id: user._id,
            name: user.name,
          },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;

            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(404).json({ response: "password not ok" });
      }
    } else {
      res.json("not found");
    }
  } catch (e) {
    res.status(422).json(e);
  }
};

//3. get users profile //route POST/profile // Private
const userProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

//4.Logout user //route POST/logout
const logoutUser = (req, res) => {
  res.cookie("token", "").json(true);
};

module.exports = { registerUser, loginUser, userProfile, logoutUser };
