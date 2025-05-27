const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
    }
})

const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'image/gif'
  ];

const fileFilter = (req, file, cb) => {
    console.log("Type de fichier reçu :", file.mimetype);
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Format de fichier non autorisé'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

module.exports = upload;
