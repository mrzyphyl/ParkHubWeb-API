const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const CryptoJS = require('crypto-js')

//Get All User
//@route GET /api/user
//@access Public
const getUser = asyncHandler (async (req, res) => {
    const user = await User.find({User})
    res.status(200).json(user)
})

//Get One User
//@route GET /api/user/:id
//@access Public
const getOneUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }
    
    res.status(200).json(user)
})

//Get Multiple User
//@route GET /api/user/:ids
//@access Public
const getMultiUser = asyncHandler (async (req, res) => {
    const user = await User.find({User})
    res.status(200).json(user)
})

//Login User
//@route POST /api/user/login
//@access Public
const loginUser = asyncHandler (async (req, res) => {
    let { email, password } = req.body

    if(!email && !password){
        res.status(400)
        throw new Error('Please provide both email and password')
    }

    // Check if the user exists
    const userExist = await User.findOne({ email })

    if (userExist) {
        // Compare the entered password with the stored password
        const bytes = CryptoJS.AES.decrypt(userExist.password, 'secret key 123');
        const storedPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (password === storedPassword) {
            res.status(200).json(userExist)
        } else {
            res.status(400);
            throw new Error('Wrong Credentials')
        }
    } else {
        res.status(400)
        throw new Error('User not found')
    }
})

//Post User
//@route POST /api/user
//@access Public
const postUser = asyncHandler (async (req, res) => {
    const { 
        username, 
        fullname,
        phone, 
        address,  
        email, 
        password 
     } = req.body

    if(!firstname && !lastname){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //Check if email exist
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('Email already in use')
    }

    //Check if email exist
    const userNameExist = await User.findOne({username})

    if(userNameExist){
        res.status(400)
        throw new Error('Username already in use')
    }

    const cipher = CryptoJS.AES.encrypt(password, 'secret key 123').toString()

    const user = await User.create({
        username, 
        fullname,
        phone, 
        address,  
        email, 
        password: cipher
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            username: user.firstname,
            fullname: user.middlename,
            phone: user.lastname,
            address: user.address,
            email: user.email,
            password: user.cipher
        })
    } else {
        res.status(400)
        throw new Error('Cant register')
    }
})

//Edit User Password
//@route PUT /api/user/:id
//@access Public
const editPassword = asyncHandler (async (req, res) => {
    //Check if User exist
    const checkUser = await User.findById(req.params.id)

    if(!checkUser){
        res.status(400)
        throw new Error('User not found')
    }

    const cipher = CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString()
    const editUserPassword = await User.findByIdAndUpdate(
        req.params.id,
        {password: cipher},
        {new: true}
    )
    res.status(200).json(editUserPassword)
})

//Update User
//@route PUT /api/user/:id
//@access Public
const updateUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})

//Delete User
//@route DELETE /api/user/:id
//@access Public
const deltUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple User
//@route DELETE /api/user/:ids
//@access Public
const deltMultiUser = asyncHandler (async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User no found')
    }

    await user.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getUser,
    getOneUser,
    getMultiUser,
    postUser,
    updateUser,
    deltUser,
    deltMultiUser,
    loginUser,
    editPassword
}