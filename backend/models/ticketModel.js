const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    Project: String,
    Category: String,
    View_Status: String,
    Reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    Assigned_To: String,
    Priority: String,
    Severity: String,
    Reproducibility: String,
    Status: String,
    Resolution: String,
    Product_Version: String,
    Summary: String,
    Description: String,
    Tags: String,
    Notes: String
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Ticket', ticketSchema)