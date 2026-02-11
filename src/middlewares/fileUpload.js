import multer from 'multer';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true); // Accept file
//     } else {
//         cb(new Error('Unsupported file format'), false); // Reject file
//     }               
// };

export const upload = multer({
    storage: storageConfig,
    // limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    // fileFilter: fileFilter
});