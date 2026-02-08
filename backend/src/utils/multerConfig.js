import multer from 'multer';

// Use memory storage - we'll upload to Cloudinary from the controller
const memoryStorage = multer.memoryStorage();

export const uploadImage = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

export const uploadVideo = multer({
  storage: memoryStorage,
  limits: { 
    fileSize: 200 * 1024 * 1024, // Increased from 100MB to 200MB for better mobile support
    timeout: 600000 // 10 minutes timeout for large uploads
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /mp4|avi|mov|webm|mkv|flv/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only video files are allowed (mp4, avi, mov, webm, mkv, flv)'));
  }
});
