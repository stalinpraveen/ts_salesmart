import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { asyncHandler } from '../utils/ApiError.js'
import { authenticate, staffOnly } from '../middleware/auth.js'
import * as auth from '../controllers/authController.js'
import * as admin from '../controllers/adminController.js'
import { handleUpload } from '../middleware/upload.js'

const strict = (limit) => rateLimit({ windowMs: 15 * 60 * 1000, limit, standardHeaders: true, legacyHeaders: false,
  message: { success: false, message: 'Too many attempts. Please try again later.' } })

export const authRouter = Router()
authRouter.post('/register', strict(20), asyncHandler(auth.register))
authRouter.post('/login', strict(20), asyncHandler(auth.login))
authRouter.post('/logout', auth.logout)
authRouter.get('/me', authenticate, auth.me)

export const inquiryRouter = Router()
inquiryRouter.post('/', strict(20), asyncHandler(admin.createInquiry))

export const adminRouter = Router()
adminRouter.use(staffOnly)
adminRouter.get('/dashboard', asyncHandler(admin.dashboard))
adminRouter.get('/vehicles', asyncHandler(admin.adminListVehicles))
adminRouter.patch('/vehicles/:id/status', asyncHandler(admin.setVehicleStatus))
adminRouter.get('/inquiries', asyncHandler(admin.adminListInquiries))
adminRouter.patch('/inquiries/:id', asyncHandler(admin.updateInquiry))
adminRouter.post('/uploads', handleUpload, asyncHandler(admin.uploadImages))
