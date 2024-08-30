const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    UserName: {
        type: String,
        trim: true,
        required: true,
    },
    methodType: { 
        type: String, 
        trim: true, 
        enum: ['credit', 'debit'], 
        required: true,
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    cardNumber: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    cvc: {
        type: String,
        required: true,
    },
    description: { 
        type: String,
        default: null 
    }
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
