const Image = require('../modules/imageModule')

const getAllImages = async (req, res) => {
    try {
        const Images = await Image.find();

        res.status(200).json({
            success: true,
            message: 'get Images successed!',
            data: Images
        });
    }
    catch (error) {
       res.status(500).json({
            success: false,
            message: 'error at get Images!',
            error: error.message 
        }); 
    }
}

// const createImage = async (req, res) => {
//     try {
//         const { url } = req.body;

//         const newImage = new Image({ url });

//         await newImage.save();

//         res.status(201).json({
//             success: true,
//             message: 'Image created successfully!',
//             data: newImage
//         });
//     }
//     catch (error) {
//         res.status(400).json({
//             success: false,
//             message: 'error at creating Image!',
//             error: error.message
//         });
//     }
// }
const createImage = async (req, res) => {
    try {
        // req.files - מערך של כל הקבצים שהועלו (בזכות multer)
        const uploadedFiles = req.files;

        if (!uploadedFiles || uploadedFiles.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'no files uploaded!'
            });
        }

        // יוצרים רשומת Image בבסיס הנתונים לכל קובץ
        const savedImages = [];

        for (const file of uploadedFiles) {
            const newImage = new Image({
                url: `/uploads/${file.filename}` // הנתיב היחסי שנשמור ב-DB
            });
            await newImage.save();
            savedImages.push(newImage);
        }

        res.status(201).json({
            success: true,
            message: 'Images uploaded successfully!',
            data: savedImages
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at uploading images!',
            error: error.message
        });
    }
}
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({
                success: false,
                message: 'image not found!'
            });
        }

        res.status(200).json({
            success: true,
            message: 'image deleted successfully!',
            data: deletedImage
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'error at deleting image!',
            error: error.message
        });
    }
}

module.exports = {
    getAllImages,
    createImage,
    deleteImage
}