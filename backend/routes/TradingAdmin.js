const router = require("express").Router();
const TradingDataAdmin = require("../models/TradingSchema");

//posting data
router.post("/addData", async (req, res) => {
  const {
    ticker,
    strike,
    premium,
    action,
    type,
    expiry,
    comment,
    quantity,
    trade_id,
    created_at,
  } = req.body;
  const newData = new TradingDataAdmin({
    ticker: ticker,
    strike: strike,
    expiry: expiry,
    comment: comment,
    premium: premium,
    action: action,
    type: type,
    quantity: quantity,
    trade_id: trade_id,
    created_at: created_at,
  });
  try {
    const data = await newData.save();
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//getting data
router.get("/getData", async (req, res) => {
  try {
    const data = await TradingDataAdmin.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Updating Data
router.put("/editdata/:id", async (req, res) => {
  const id = req.params.id;
  const { ticker, strike, action, premium, type, comment, quantity } =
    req.body.data;
  const expiry = req.body.expiry;
  const created_at = req.body.created_at;

  try {
    const value = await TradingDataAdmin.findByIdAndUpdate(id, {
      ticker: ticker,
      strike: strike,
      expiry: expiry,
      comment: comment,
      quantity: quantity,
      type: type,
      action: action,
      premium: premium,
      created_at: created_at,
    });
    res.status(201).json(value);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//deleting data
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await TradingDataAdmin.findByIdAndDelete(id);
    res.status(201).json("Deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
