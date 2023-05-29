const router = require('express-promise-router')()
const {sportsmans} = require('../controllers')

router.route('/').get(sportsmans.getSportsmans)
router.route('/').post(sportsmans.createSportsman)
router.route('/:id').post(sportsmans.updateSportsman)
router.route('/:id').delete(sportsmans.deleteSportsman)

module.exports = router