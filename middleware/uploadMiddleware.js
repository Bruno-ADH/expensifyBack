const multer = require ("multer");

// Configuartion du stokage avec multer : dossier de destination + nom du fichier
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Crée ce dossier à la racine de ton projet
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${ Date.now() }-${ Math.round(Math.random() * 1E9)}`;
        cb(null, uniqueSuffix);
    },
});

//Filtrer les types de fichier d'image
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb(new Error('Seule .jpeg, .jpg et png formats sont requis'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;