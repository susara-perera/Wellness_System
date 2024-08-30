const express = require('express');
const router = express.Router();
const Payment = require('../models/PaymentSchema');

// Insert new payment
router.post('/add', async (req, res) => {
    const { UserName, methodType, firstName, lastName, cardNumber, date, cvc, description } = req.body;

    const newPayment = new Payment({
        UserName,
        methodType,
        firstName,
        lastName,
        cardNumber,
        date,
        cvc,
        description // Include the description field
    });

    try {
        await newPayment.save();
        res.status(201).json({ message: 'Payment added successfully.' });
    } catch (err) {
        res.status(400).json({ message: 'Error: ' + err.message });
    }
});

// Read all payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).json(payments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payments', error: err.message });
    }
});
// Read a specific payment by ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) return res.status(404).json({ message: 'Payment not found' });
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching payment', error: err.message });
    }
});


// Update payment by ID
router.put('/update/:id', async (req, res) => {
    const paymentId = req.params.id;
    const { description } = req.body; // Only description is allowed to be updated

    try {
        const updatedPayment = await Payment.findByIdAndUpdate(paymentId, { description }, {
            new: true, 
            runValidators: true 
        });

        if (!updatedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json(updatedPayment);
    } catch (err) {
        res.status(400).json({ message: 'Error updating payment', error: err.message });
    }
});



// Delete payment by ID
router.delete('/delete/:id', async (req, res) => {
    const paymentId = req.params.id;

    try {
        const deletedPayment = await Payment.findByIdAndDelete(paymentId);

        if (!deletedPayment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting payment', error: err.message });
    }
});

module.exports = router;
