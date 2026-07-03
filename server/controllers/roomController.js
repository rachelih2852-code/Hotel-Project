const Room = require('../modules/roomModule')

const createRoom = async (req, res) => {
    try {
        const {room_type, room_number, floor , is_active} = req.body;

        const newRoom = new Room ({room_type, room_number, floor , is_active});

        await newRoom.save();

        res.status(201).json({
            success: true,
            message: 'Room created successfully!',
            data: {id: newRoom._id,room_type: newRoom.room_type, room_number: newRoom.room_number, floor: newRoom.floor , is_active: newRoom.is_active }
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

const getAllRooms = async (req, res) => {
    try {
        const Rooms = await Room.find();

        res.status(200).json({
            success: true,
            message: 'get Rooms successed!',
            data: Rooms
        });
    }
    catch (error) {
       res.status(500).json({
            success: false,
            message: 'error at get Rooms!',
            error: error.message 
        }); 
    }
}

const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRoom = await Room.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({
                success: false,
                message: 'room not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'room deleted successfully!',
            data: { id: deletedRoom._id, room_number: deletedRoom.room_number }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at deleting room!',
            error: error.message
        });
    }
}

module.exports = {
    createRoom,
    deleteRoom,
    getAllRooms
}