const express = require("express");
const mongoose = require("mongoose");
const { Account } = require("../db/db");
const { authMiddleware } = require("../middleware/middleware");

const router = express.Router();
router.use(express.json());

router.get("/balance", authMiddleware, async (req, res) => {
  //   console.log(req.userId);
  const account = await Account.findOne({ userId: req.userId });
  console.log(account);
  res.json({
    balance: account.balance,
  });
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  //   Fetch the accounts within the transactions
  const account = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Insufficient balance" });
  }
  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({ message: "Invalid Account" });
  }

  //   Perform the transactions

  const senderBalance = await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session();
  const receiverBalance = await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session();
  console.log("Money Transferred");
  console.log(senderBalance);
  console.log(receiverBalance);

  //   Commit the session

  await session.commitTransaction();
  res.json({
    message: "Transfer complete",
  });
});

module.exports = router;
