const express = require('express');
const router = express.Router();
const ImageRoomController = require('../controllers/imageRoomController')

router.get('/getAllImageRooms', ImageRoomController.getAllImageRooms);
router.post('/createImageRoom', ImageRoomController.createImageRoom);
router.delete('/deleteImageRoom', ImageRoomController.deleteImageRoom);

module.exports = router