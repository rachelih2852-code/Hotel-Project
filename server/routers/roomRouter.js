const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/roomController')

router.get('/getAllRooms', RoomController.getAllRooms);
router.post('/createRoom', RoomController.createRoom);
router.delete('/deleteRoom', RoomController.deleteRoom);

module.exports = router
