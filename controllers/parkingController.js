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

// Update Parking Data
// @route PUT /api/parking/compute/:id
// @access Public
const computeRate = asyncHandler(async (req, res) => {
    const { total_hours } = req.body
    const parkingId = req.params.id

    try {
        const parking = await Parking.findById(parkingId)

        if (!parking) {
            res.status(404);
            throw new Error('Parking not found')
        }

        if (total_hours) {
            // Parse the total_hours to convert from HH:MM:SS format to hours
            const timeComponents = total_hours.split(':')
            const hours = parseInt(timeComponents[0])
            const minutes = parseInt(timeComponents[1])
            const seconds = parseInt(timeComponents[2])

            const totalHours = hours + minutes / 60 + seconds / 3600;

            // Compute the total_amount based on the rate (20 pesos per hour)
            parking.total_hours = totalHours.toFixed(2)
            parking.total_amount = (totalHours * 20).toFixed(2)
        }

        const updatedParking = await parking.save()

        res.json({
            _id: updatedParking.id,
            customer: updatedParking.customer,
            total_amount: updatedParking.total_amount,
            total_hours: updatedParking.total_hours,
            isActive: updatedParking.isActive,
            isCanceled: updatedParking.isCanceled
        });
    } catch (error) {
        res.status(400).json({ error: error.message })
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
    cancelStatus,
    cancelParking,
    computeRate
}