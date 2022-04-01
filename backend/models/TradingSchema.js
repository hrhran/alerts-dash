const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TradingSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    strike: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    premium: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    expiry: {
      type: String,
      required:true
      
    },
    created_at:{
      type:Number,
      required:true
    },
    trade_id:{
      type:String,
      required:true
    }
  }
);

module.exports = mongoose.model("Destination", TradingSchema);
