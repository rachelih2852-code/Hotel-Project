const RoomType = require('../modules/roomTypeModule')

const createRoomType = async (req, res) => {
    try {
        const {sort, max_guests, base_price,description} = req.body;

        const newRoomType = new RoomType ({sort, max_guests, base_price,description});

        await newRoomType.save();

        res.status(201).json({
            success: true,
            message: 'RoomType created successfully!',
            data: {id: newRoomType._id,sort: newRoomType.sort, max_guests: newRoomType.max_guests, base_price: newRoomType.base_price,description: newRoomType.description}
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at creating RoomType!',
            error: error.message 
        });
    }
}

const getAllRoomTypes = async (req, res) => {
    try {
        const RoomTypes = await RoomType.find();

        res.status(200).json({
            success: true,
            message: 'get RoomTypes successed!',
            data: RoomTypes
        });
    }
    catch (error) {
       res.status(500).json({
            success: false,
            message: 'error at get RoomTypes!',
            error: error.message 
        }); 
    }
}

const deleteRoomType = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRoom = await RoomType.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({
                success: false,
                message: 'roomType not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'roomType deleted successfully!',
            data: { id: deletedRoom._id, room_number: deletedRoom.room_number }
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at deleting roomType!',
            error: error.message
        });
    }
}

module.exports = {
    createRoomType,
    deleteRoomType,
    getAllRoomTypes
}