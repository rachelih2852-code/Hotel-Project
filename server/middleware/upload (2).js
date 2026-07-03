const multer = require('multer');
const path = require('path');

// הגדרת איפה ואיך לשמור את הקבצים
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // תיקייה שבה יישמרו הקבצים בפועל
    },
    filename: function (req, file, cb) {
        // שם ייחודי לכל קובץ, כדי למנוע דריסה של קבצים עם אותו שם
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = upload;