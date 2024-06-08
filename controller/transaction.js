const Transactions = require("../models/transaction");
const moment = require("moment");
exports.addTransaction = async (req, res) => {
  try {
    const newTransaction = new Transactions(req.body);
    await newTransaction.save();
    res.status(201).json({ message: "Transaction added successfully !" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong !" });
    console.log(err);
  }
};

exports.editTransaction = async (req, res) => {
  try {
    await Transactions.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payLoad
    );
    res.status(201).json({ message: "Transaction updated successfully !" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong !" });
    console.log(err);
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transactions.findOneAndDelete({ _id: req.body.transactionId });
    res.status(201).json({ message: "Transaction deleted successfully !" });
  } catch (err) {
    res.status(500).json({ message: "something went wrong !" });
    console.log(err);
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const { frequency, selectedRange, type } = req.body;
    const allTransactions = await Transactions.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      ...(type !== "all" && { type }),
      userId: req.body.userId,
    });
    if (allTransactions) {
      res.status(201).json({ allTransactions });
    } else {
      return res.status(400).json({ message: "no transactions found !" });
    }
  } catch (err) {
    res.status(500).json({ message: "something went wrong !" });
    console.log(err);
  }
};
