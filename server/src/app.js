import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import { authRouter, inquiryRouter, adminRouter } from './routes/apiRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()
  app.disable('x-powered-by')
  app.use(helmet())
  app.use(cors({ origin: env.clientUrl, credentials: true }))
  app.use(express.json({ limit: '100kb' }))
  app.use(cookieParser())
  app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, limit: 600, standardHeaders: true, legacyHeaders: false }))

  app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok' }))
  app.use('/api/vehicles', vehicleRoutes)
  app.use('/api/auth', authRouter)
  app.use('/api/inquiries', inquiryRouter)
  app.use('/api/admin', adminRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
