import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import { env } from './config/env.js'
import vehicleRoutes from './routes/vehicleRoutes.js'
import { authRouter, inquiryRouter, adminRouter, favoriteRouter } from './routes/apiRoutes.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import { noSqlSanitize, preventHpp } from './middleware/sanitize.js'
import { ApiError } from './utils/ApiError.js'

export function createApp() {
  const app = express()

  // 1. Trust reverse proxy (Render, Vercel, Nginx) for accurate client IP rate limiting
  app.set('trust proxy', 1)

  // 2. Hide server framework identification
  app.disable('x-powered-by')

  // 3. Security HTTP headers via Helmet
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      hsts: env.nodeEnv === 'production' ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,
    })
  )

  // 4. Strict CORS configuration with multi-origin validation
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true)
        const normalized = origin.replace(/\/$/, '')
        if (
          env.allowedOrigins.some((o) => o.replace(/\/$/, '') === normalized) ||
          normalized.endsWith('.vercel.app') ||
          normalized.includes('localhost') ||
          normalized.includes('127.0.0.1')
        ) {
          return callback(null, true)
        }
        callback(new ApiError(403, `CORS blocked: Origin ${origin} is not authorized`))
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
      exposedHeaders: ['x-csrf-token'],
      maxAge: 86400,
    })
  )

  // 5. Strict payload size limits (mitigate DoS memory exhaustion)
  app.use(express.json({ limit: '100kb' }))
  app.use(express.urlencoded({ extended: true, limit: '100kb' }))

  // 6. Cookie parser for secure JWT session tokens and CSRF double-submit
  app.use(cookieParser())

  // 7. Security data sanitization against NoSQL injection and HTTP Parameter Pollution
  app.use(noSqlSanitize)
  app.use(preventHpp())

  // 8. Global API Rate Limiter
  app.use(
    '/api',
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 600,
      standardHeaders: true,
      legacyHeaders: false,
      message: { success: false, message: 'Too many requests from this IP. Please try again after 15 minutes.' },
    })
  )

  app.get('/api/health', (req, res) => res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() }))
  app.use('/api/vehicles', vehicleRoutes)
  app.use('/api/auth', authRouter)
  app.use('/api/inquiries', inquiryRouter)
  app.use('/api/favorites', favoriteRouter)
  app.use('/api/admin', adminRouter)

  app.use(notFound)
  app.use(errorHandler)
  return app
}
