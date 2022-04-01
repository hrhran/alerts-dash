const express = require('express')
const router = express.Router()
const {
  getAlerts,
  addAlert,
  editAlert,
  deleteAlert,
  getSingleAlert
} = require('../controllers/alertsController')


router.get('/alerts', getAlerts)
router.get('/alerts/:id', getSingleAlert)
router.post('/alerts', addAlert)
router.put('/alerts/:id', editAlert)
router.delete('/alerts/:id', deleteAlert)


module.exports = router
