const express  = require('express')
const { 
    getUser, 
    postUser, 
    updateUser, 
    deltUser, 
    getOneUser, 
    deltMultiUser, 
    getMultiUser, 
    loginUser, 
    editPassword
 } = require('../controllers/userController')
const router = express.Router()

router.route('/').get(getUser).post(postUser)

router.route('/:id').put(updateUser).delete(deltUser).get(getOneUser)

router.route('/:ids').delete(deltMultiUser).get(getMultiUser)

router.route('/login').post(loginUser)

router.route('/forgotpass/:id').put(editPassword)

module.exports = router