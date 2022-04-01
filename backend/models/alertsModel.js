const mongoose = require('mongoose')
const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    action: {
      type: String,
    },
    ticker: {
      type: String,
    },
    strike:{
      type: String,
    },
    type:{
      type: String,
    },
    premium:{
      type: Number,
    },
    expiry:{
      type: String,
    },
    comment:{
      type: String,
    },
    created_at: { 
        type: Number,
        default: Math.floor(Date.now() / 1000),
     },
    quantity:{
        type: Number, 
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Alert', userSchema)
