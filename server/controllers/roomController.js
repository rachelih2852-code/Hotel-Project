const Room = require('../modules/roomModule')

const createRoom = async (req, res) => {
    try {
        const {room_type, room_number, floor,room_number , is_active} = req.body;

        const newRoom = new Room ({room_type, room_number, floor,room_number , is_active});

        await newRoom.save();

        res.status(201).json({
            success: true,
            message: 'Room created successfully!',
            data: {id: newRoom._id,room_type: newRoom.room_type, room_number: newRoom.room_number, floor: newRoom.floor,room_number: newRoom.room_number , is_active: newRoom.is_active }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at creating Room!',
            error: error.message 
        });
    }
}