const router = require('express-promise-router')()
const {coaches} = require('../controllers')

router.route('/').get(coaches.getCoaches)
router.route('/:id').delete(coaches.deleteCoach)

module.exports = router