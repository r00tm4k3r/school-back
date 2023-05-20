const router = require('express-promise-router')()
const {contests} = require('../controllers')

router.route('/').get(contests.getContests)
router.route('/:id').delete(contests.deleteContest)

module.exports = router