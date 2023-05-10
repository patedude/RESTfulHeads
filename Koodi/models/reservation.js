const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    date: {
        type: Date, 
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    number: {
        type: String,
        required: true
    }
});

//Export model
module.exports = mongoose.model('Reservations', ReservationSchema);