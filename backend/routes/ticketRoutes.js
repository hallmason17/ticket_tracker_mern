const express = require ('express')
const router = express.Router()
const { getTickets, setTickets, updateTickets, deleteTickets } = require('../controllers/ticketController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getTickets).post(protect, setTickets)
router.route('/:id').delete(protect, deleteTickets).put(protect, updateTickets)

module.exports = router