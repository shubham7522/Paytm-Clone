const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { authMiddleware } = require("../middleware/middleware");

const router = express.Router();
router.use(express.json());

// Creating the Schema
const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string().max(50),
  lastName: zod.string().max(50),
  password: zod.string().min(3).max(50),
});

const signinSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  lastName: zod.string().optional(),
  firstName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const response = req.body;

  // Checking the values with the zod library
  const { success } = signupSchema.safeParse(response);

  if (!success) {
    return res.json(411).json({
      msg: "Incorrcet Inputs",
    });
  }
  // Checking the database if the user is already present in the database
  else {
    const existingUser = await User.findOne({ username: response.username });

    if (existingUser) {
      return res
        .status(411)
        .json({ msg: "The username already there please try other username;" });
    }
    // Creating a new user in the database
    else {
      const newUser = await User.create({
        username: response.username,
        firstName: response.firstName,
        lastName: response.lastName,
        password: response.password,
      });

      console.log("Created the user in database");
      const userId = newUser._id;

      // Creating the account balance
      const accountBalance = await Account.create({
        userId,
        balance: 1 + Math.random() * 10000,
      });

      const token = jwt.sign({ userId }, process.env.JWT_SECRET);
      res.json({
        msg: "User created successfully",
        token: token,
      });
    }
  }
});

router.post("/signin", async (req, res) => {
  const response = req.body;
  const { success } = signinSchema.safeParse(response);
  if (!success) {
    res.status(411).json({ msg: "Incorrect Inputs" });
  } else {
    const existingUser = await User.findOne({
      username: response.username,
      password: response.password,
    });
    if (existingUser) {
      const userId = existingUser._id;
      const token = jwt.sign({ userId }, JWT_SECRET);
      res.json({ token: token });
      return;
    } else {
      res.status(411).json({ msg: "Error occured while logging in" });
    }
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    res.status(411).json({ message: "Error while updating information" });
  } else {
    const updated = await User.updateOne({ _id: req.userId }, req.body);
    console.log("Updated");
    res.status(500).json({ msg: "Updated Successfully" });
  }
});

router.get("/bulk", async (req, res) => {
  const name = req.query.filter;

  const users = await User.find({
    $or: [{ firstName: { $regex: name } }, { lastName: { $regex: name } }],
  });
  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
