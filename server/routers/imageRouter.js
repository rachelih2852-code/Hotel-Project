const express = require('express');
const router = express.Router();
//const ImageController = require('../controllers/imageController')

router.get('/getAllImages', ImageController.getAllImages);
//router.post('/createImage', ImageController.createImage);
router.delete('/deleteImage', ImageController.deleteImage);

const upload = require('../middleware/upload');
const { createImage } = require('../controllers/imageController');

// upload.array('images') - שם 'images' חייב להתאים לשם שבו שלחת את הקבצים ב-FormData
router.post('/images', upload.array('images'), createImage);

module.exports = router