const asyncHandler = require('express-async-handler')

const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

//@desc     Get tickets
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req,res) => {
    const tickets = await Ticket.find({ user: req.user.id })

    res.status(200).json(tickets)
})

//@desc     Set tickets
//@route    POST /api/tickets
//@access   Private
const setTickets = asyncHandler(async (req,res) => {
    if(!req.body.Project){
        res.status(400)
        throw new Error('Please add a Project')
    }

    const ticket = await Ticket.create({
        Project: req.body.Project,
        Category: req.body.Category,
        View_Status: req.body.View_Status,
        Reporter: req.user.id,
        Assigned_To: req.body.Assigned_To,
        Priority: req.body.Priority,
        Severity: req.body.Severity,
        Reproducibility: req.body.Reproducibility,
        Status: req.body.Status,
        Resolution: req.body.Resolution,
        Product_Version: req.body.Product_Version,
        Summary: req.body.Summary,
        Description: req.body.Description,
        Tags: req.body.Tags,
        Notes: req.body.Notes
    })
    res.status(200).json(ticket)
})

//@desc     Update tickets
//@route    PUT /api/tickets/:id
//@access   Private
const updateTickets = asyncHandler(async (req,res) => {
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }

    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the ticket user
    if(ticket.Reporter._id.toString() !== user.id)
    {
        res.status(401)
        throw new Error('Wrong user')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedTicket)
})


//@desc     Delete tickets
//@route    DELETE /api/tickets
//@access   Private
const deleteTickets = asyncHandler(async (req,res) => {
    const ticket = await Ticket.findById(req.params.id)

    if(!ticket){
        res.status(400)
        throw new Error('Ticket not found')
    }
    const user = await User.findById(req.user.id)

    //Check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //Make sure the logged in user matches the ticket user
    if(ticket.Reporter._id.toString() !== user.id)
    {
        res.status(401)
        throw new Error('Wrong user')
    }

    await ticket.remove()

    res.status(200).json({id: req.params.id})
})

module.exports= {
    getTickets,
    setTickets,
    updateTickets,
    deleteTickets
}