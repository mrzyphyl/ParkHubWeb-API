const express  = require('express')
const { 
    getParking, 
    postParking, 
    updateParking,
    deltParking,
    getOneParking,
    deltMultiParking,
    getMultiParking
} = require('../controllers/parkingController')
const router = express.Router()

router.route('/').get(getParking).post(postParking)

router.route('/:id').put(updateParking).delete(deltParking).get(getOneParking)

router.route('/:ids').delete(deltMultiParking).get(getMultiParking)

module.exports = router