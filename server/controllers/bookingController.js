const Booking = require('../modules/bookingModule')
//comment for git
//another comment

///more more 1234
const createBooking = async (req, res) => {
    try {
        const { customer_id, room_id, check_in_date, check_out_date, num_guests, total_price, status } = req.body;

        const newBooking = new Booking({
            customer_id,
            room_id,
            check_in_date,
            check_out_date,
            num_guests,
            total_price,
            status,
            created_at: new Date()
        });

        await newBooking.save();

        res.status(201).json({
            success: true,
            message: 'Booking created successfully!',
            data: newBooking
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at creating Booking!',
            error: error.message
        });
    }
}

const getAllBookings = async (req, res) => {
    try {
        const Bookings = await Booking.find();

        res.status(200).json({
            success: true,
            message: 'get Bookings successed!',
            data: Bookings
        });
    }
    catch (error) {
       res.status(500).json({
            success: false,
            message: 'error at get Bookings!',
            error: error.message 
        }); 
    }
}

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { customer_id, room_id, check_in_date, check_out_date, num_guests, total_price, status } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { customer_id, room_id, check_in_date, check_out_date, num_guests, total_price, status },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({
                success: false,
                message: 'booking not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking updated successfully!',
            data: updatedBooking
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at updating Booking!',
            error: error.message
        });
    }
}

module.exports = {
    createBooking,
    updateBooking,
    getAllBookings
}
