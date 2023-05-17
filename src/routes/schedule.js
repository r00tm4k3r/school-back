const router = require('express-promise-router')()
const {schedule} = require('../controllers')

router.route('/').get(schedule.getSchedule)

module.exports = router