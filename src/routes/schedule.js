const router = require('express-promise-router')()
const {schedule} = require('../controllers')

router.route('/').get(schedule.getSchedules)
router.route('/:id').delete(schedule.deleteSchedule)

module.exports = router