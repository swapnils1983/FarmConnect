const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Seller = require("../models/sellerSchema");
const User = require("../models/userSchema");

const sellerRegister = async (req, res) => {
  try {
    const { name, contact, email, password, brandName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSeller = new Seller({
      name,
      contact,
      email,
      password: hashedPassword,
      brandName,
    });

    await newSeller.save();
    res
      .status(201)
      .json({ message: "Seller registered successfully", user: newSeller });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      res
        .status(400)
        .json({
          error: `The ${duplicateField} already exists. Please use a different ${duplicateField}.`,
        });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findOne({ email });

    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Seller logged in successfully",
      user: {
        name: seller.name,
        email: seller.email,
        brandName: seller.brandName,
        contact: seller.contact,
        role: seller.role,
        id: seller._id,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userRegister = async (req, res) => {
  try {
    const { name, contact, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      contact,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      res
        .status(400)
        .json({
          error: `The ${duplicateField} already exists. Please use a different ${duplicateField}.`,
        });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "User logged in successfully", token, user:{
        name: user.name,
        email: user.email,
        contact: user.contact,
        role: user.role,
        _id: user._id,
        token,
    } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  sellerLogin,
  sellerRegister,
  userLogin,
  userRegister,
};
