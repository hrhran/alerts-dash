const e = require('express');
const asyncHandler = require('express-async-handler')
const Alerts = require('../models/alertsModel')



//GET /api/alerts
const getAlerts = asyncHandler(async (req, res) => {
  Alerts
  .find({})
  .sort({ created_at: -1 })
  .then((alerts) => {
    if (alerts === null) {
      res.status(200).json("Empty")
    } else {
        res.status(200).json(alerts)
    }
  });
})



//GET /api/alerts/:id
const getSingleAlert = asyncHandler(async (req, res) => {
    Alerts
    .findOne({_id:req.params.id})
    .then((alert) => {
      if (alert === null) {
        res.status(200).json("Cannot find alert for the id")
      } else {
          res.status(200).json(alert)
      }
    });
})

//POST /api/alerts
const addAlert = asyncHandler(async (req, res) => {
const {id, action, ticker, strike, type, premium, expiry, comment, quantity} = req.body
if (!id || !action || !ticker || !strike || !type || !premium || !expiry || !comment || !quantity ) {
    res.status(400).json({
        message: 'Please add all fields'
    })
}else{
    const alert = await Alerts.create({
        id: id,
        action: action,
        ticker: ticker,
        strike: strike,
        type: type,
        premium: premium,
        expiry: expiry,
        comment: comment,
        quantity: quantity,
      })
      if (alert) {
        res.status(201).json({
          message: 'Alert added successfully.',
        })
      } else {
        res.status(400).json({
            message: 'Error while adding alert.'
        })
      }
}
})


//PUT /api/alerts/:id
const editAlert = asyncHandler(async (req, res) => {
    const {id, action, ticker, strike, type, premium, expiry, comment, quantity} = req.body
    if (!id || !action || !ticker || !strike || !type || !premium || !expiry || !comment || !quantity ) {
        res.status(400).json({
            message: 'Please add all fields'
        })
    }else{
        Alerts.findByIdAndUpdate(req.params.id, {
            id: id,
            action: action,
            ticker: ticker,
            strike: strike,
            type: type,
            premium: premium,
            expiry: expiry,
            comment: comment,
            quantity: quantity,
        }, {new: true})
        .then(alert => {
            if(!alert) {
                return res.status(404).json({
                    message: "Error editing the alert."
                });
            }else{
                res.status(200).json({
                    message: "Alert edited succesfully."
                });
            }
        })
    }
})



//DELETE /api/alerts/:id
const deleteAlert = asyncHandler(async (req, res) => {
    Alerts.findByIdAndRemove(req.params.id)
    .then(alert => {
        if(!alert) {
            return res.status(404).json({
                message: "No alert found",
            });
        }else{
            res.status(200).json({message: "Alert deleted successfully."});
        }
    })
})


  module.exports = {
      getAlerts,
      getSingleAlert,
      addAlert,
      editAlert,
      deleteAlert,
  }
