const asyncHandler = require('express-async-handler')
const Parking = require('../models/parkingModel')

//Get Parking Data
//@route GET /api/parking
//@access Public
const getParking = asyncHandler (async (req, res) => {
    const parking = await Parking.find({Parking})
    res.status(200).json(parking)
})

//Get One Parking Data
//@route GET /api/parking/:id
//@access Public
const getOneParking = asyncHandler (async (req, res) => {
    const parking = await Parking.findById(req.params.id)

    if(!parking){
        res.status(400)
        throw new Error('User no found')
    }
    
    res.status(200).json(parking)
})

//Get Multiple Parking Data
//@route GET /api/parking/:ids
//@access Public
const getMultiParking = asyncHandler (async (req, res) => {
    const parking = await Parking.find({Parking})
    res.status(200).json(parking)
})

//Post Parking Data
//@route POST /api/parking
//@access Public
const postParking = asyncHandler (async (req, res) => {
    const { 
        customer, 
     } = req.body

    if(!customer){
        res.status(400)
        throw new Error('Please add all fields')
    }

    const parking = await Parking.create({
        customer, 
        isActive: true,
        isCanceled: false
    })

    if(parking){
        res.status(201).json({
            _id: parking.id,
            customer: user.customer,
            isActive: user.isActive,
            isCanceled: user.isCanceled
        })
    } else {
        res.status(400)
        throw new Error('Cant register')
    }
})

// Parking Not Active
// @route PUT /api/parking/deactivated/:id
// @access Public
const cancelStatus = asyncHandler(async (req, res) => {
    const parking = await Parking.findById(req.params.id);

    if (!parking) {
        res.status(404).json({ message: 'Parking not found' })
    } else {
        parking.isActive = false;
        const updatedParking = await parking.save()
        res.status(200).json(updatedParking)
    }
})

// Cancel Parking
// @route PUT /api/parking/cancel/:id
// @access Public
const cancelParking = asyncHandler(async (req, res) => {
    const parking = await Parking.findById(req.params.id);

    if (!parking) {
        res.status(404).json({ message: 'Parking not found' })
    } else {
        // Set the `isCanceled` field to true and save the document
        parking.isCanceled = true;
        const updatedParking = await parking.save()
        res.status(200).json(updatedParking)
    }
})

//Update Parking Data
//@route PUT /api/parking/:id
//@access Public
const updateParking = asyncHandler (async (req, res) => {
    const parking = await Parking.findById(req.params.id)

    if(!parking){
        res.status(400)
        throw new Error('User no found')
    }

    const updatedUser = await Parking.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    res.status(200).json(updatedUser)
})

//Delete Parking Data
//@route DELETE /api/parking/:id
//@access Public
const deltParking = asyncHandler (async (req, res) => {
    const parking = await Parking.findById(req.params.id)

    if(!parking){
        res.status(400)
        throw new Error('User no found')
    }

    await parking.deleteOne()

    res.status(200).json({ id: req.params.id})
})


//Delete Multiple Parking Data
//@route DELETE /api/parking/:ids
//@access Public
const deltMultiParking = asyncHandler (async (req, res) => {
    const parking = await Parking.findById(req.params.id)

    if(!parking){
        res.status(400)
        throw new Error('User no found')
    }

    await parking.deleteMany()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getParking,
    getOneParking,
    getMultiParking,
    postParking,
    updateParking,
    deltParking,
    deltMultiParking,
}