const asyncHandler = require('express-async-handler')

const Data = require('../models/dataModel')

const getGoals = asyncHandler(async (req, res) => {
    const datalist = await Data.find({ user: req.user.id })

    if (!datalist) {
        throw new Error('Unable to get data')
    }

    res.status(200).json(datalist)
})

const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.message) {
        throw new Error('Please add a text value.')
    }

    const inserted = await Data.create({
        message: req.body.message,
        user: req.user.id
    })

    res.status(200).json(inserted)
})

const updateGoal = asyncHandler(async (req, res) => {
    const data = await Data.findById(req.params.id)

    if (!data) {
        res.status(400)
        throw new Error('Data not found')
    }

    //Check for user
    if(!req.user.id){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (data.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateData = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updateData)
})

const deleteGoal = asyncHandler(async (req, res) => {
    const data = await Data.findById(req.params.id)

    if (!data) {
        res.status(400)
        throw new Error('Data not found')
    }

    //Check for user
    if(!req.user.id){
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (data.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await data.remove()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}