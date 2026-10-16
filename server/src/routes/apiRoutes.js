import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { asyncHandler } from '../utils/ApiError.js'
import { authenticate, staffOnly } from '../middleware/auth.js'
import * as auth from '../controllers/authController.js'
import * as admin from '../controllers/adminController.js'
import * as favorite from '../controllers/favoriteController.js'
import { handleUpload } from '../middleware/upload.js'

const authLimiter = (limit, windowMs = 15 * 60 * 1000) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many attempts. Please try again later.' },
  })

export const authRouter = Router()
authRouter.post('/register', authLimiter(10, 60 * 60 * 1000), asyncHandler(auth.register)) // 10 per hour
authRouter.post('/login', authLimiter(10, 15 * 60 * 1000), asyncHandler(auth.login))       // 10 per 15 min
authRouter.post('/logout', auth.logout)
authRouter.get('/me', authenticate, auth.me)

export const inquiryRouter = Router()
inquiryRouter.post('/', authLimiter(15, 30 * 60 * 1000), asyncHandler(admin.createInquiry))

export const adminRouter = Router()
adminRouter.use(staffOnly)
adminRouter.get('/dashboard', asyncHandler(admin.dashboard))
adminRouter.get('/vehicles', asyncHandler(admin.adminListVehicles))
adminRouter.patch('/vehicles/:id/status', asyncHandler(admin.setVehicleStatus))
adminRouter.get('/inquiries', asyncHandler(admin.adminListInquiries))
adminRouter.patch('/inquiries/:id', asyncHandler(admin.updateInquiry))
adminRouter.post('/uploads', handleUpload, asyncHandler(admin.uploadImages))

export const favoriteRouter = Router()
favoriteRouter.use(authenticate)
favoriteRouter.get('/', asyncHandler(favorite.getFavorites))
favoriteRouter.post('/:vehicleId', asyncHandler(favorite.addFavorite))
favoriteRouter.delete('/:vehicleId', asyncHandler(favorite.removeFavorite))
