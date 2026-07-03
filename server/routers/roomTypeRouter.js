const express = require('express');
const router = express.Router();
const RoomTypeController = require('../controllers/roomTypeController')

router.get('/getAllRoomTypes', RoomTypeController.getAllRoomTypes);
router.post('/createRoomType', RoomTypeController.createRoomType);
router.delete('/deleteRoomType/:id', RoomTypeController.deleteRoomType);

module.exports = router


//mongodb+srv://gipi0504171_db_user:<db_password>@mycluster.5ke0mtj.mongodb.net/?appName=MyCluster