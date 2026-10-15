import multer from 'multer'
import { ApiError } from '../utils/ApiError.js'

const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp'])

export const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 8 },
  fileFilter: (req, file, cb) =>
    ALLOWED.has(file.mimetype) ? cb(null, true) : cb(new ApiError(400, 'Only JPG, PNG or WebP images are allowed')),
}).array('images', 8)

// Turn multer's own errors into friendly 400s.
export function handleUpload(req, res, next) {
  imageUpload(req, res, (err) => {
    if (!err) return next()
    if (err instanceof multer.MulterError)
      return next(new ApiError(400, err.code === 'LIMIT_FILE_SIZE' ? 'Each image must be 5 MB or smaller' : 'Too many files (maximum 8)'))
    next(err)
  })
}
