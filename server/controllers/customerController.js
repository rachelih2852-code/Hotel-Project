const Customer = require('../modules/customerModule')

const createCustomer = async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const newCustomer = new Customer({ name, email, phone });

        await newCustomer.save();

        res.status(201).json({
            success: true,
            message: 'Customer created successfully!',
            data: newCustomer
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at creating Customer!',
            error: error.message
        });
    }
}

const getAllCustomers = async (req, res) => {
    try {
        const Customers = await Customer.find();

        res.status(200).json({
            success: true,
            message: 'get Customers successed!',
            data: Customers
        });
    }
    catch (error) {
       res.status(500).json({
            success: false,
            message: 'error at get Customers!',
            error: error.message 
        }); 
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        const updatedCustomer = await Customer.findByIdAndUpdate(
            id,
            { name, email, phone },
            { new: true }
        );

        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: 'customer not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Customer updated successfully!',
            data: updatedCustomer
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at updating Customer!',
            error: error.message
        });
    }
}

module.exports = {
    createCustomer,
    updateCustomer,
    getAllCustomers
}