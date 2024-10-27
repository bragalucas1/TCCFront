const multer = require('multer');
const path = require('path');
const fs = require('fs');

const baseUploadDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(baseUploadDir)) {
    fs.mkdirSync(baseUploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const activityName = req.body.title || 'atividade-geral';
        const activityDir = path.join(baseUploadDir, activityName);

        if (!fs.existsSync(activityDir)) {
            fs.mkdirSync(activityDir, { recursive: true });
        }
        
        cb(null, activityDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = file.originalname;
        cb(null, uniqueSuffix);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|py/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (extname) {
        return cb(null, true);
    }
    cb(new Error('Apenas arquivos PDF e PY são permitidos!'));
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});

module.exports = upload;
