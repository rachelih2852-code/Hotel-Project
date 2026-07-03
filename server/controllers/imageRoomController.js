const Image_Room = require('../modules/ImageRoomModule')

const createImageRoom = async (req, res) => {
    try {
        const {id_room, id_img} = req.body;

        const newImage_Room = new Image_Room ({id_room, id_img});

        await newImage_Room.save();

        res.status(201).json({
            success: true,
            message: 'Room created successfully!',
            data: {id: Image_Room._id, id_room: Image_Room.id_room ,id_img: Image_Room.id_img}
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at creating image room!',
            error: error.message 
        });
    }
}

const getAllImageRooms = async (req, res) => {
    try {
        const ImageRooms = await Image_Room.find();

        res.status(200).json({
            success: true,
            message: 'get ImageRooms successed!',
            data: ImageRooms
        });
    }
    catch (error) {
       res.status(500).json({
            success: false,
            message: 'error at get ImageRooms!',
            error: error.message 
        }); 
    }
}

const deleteImageRoom= async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage_Room= await Image_Room.findByIdAndDelete(id);

        if (!deletedImage_Room) {
            return res.status(404).json({
                success: false,
                message: 'Image_Room not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Image_Room deleted successfully!',
            data: {id: Image_Room._id, id_room: Image_Room.id_room ,id_img: Image_Room.id_img}
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at deleting Image room!',
            error: error.message
        });
    }
}

module.exports = {
    createImageRoom,
    deleteImageRoom,
    getAllImageRooms
}