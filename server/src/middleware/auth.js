import jwt from 'jsonwebtoken'
import crypto from 'node:crypto'
import { env } from '../config/env.js'
import { User } from '../models/User.js'
import { ApiError, asyncHandler } from '../utils/ApiError.js'

const isProd = env.nodeEnv === 'production'
const MAX_AGE = 7 * 24 * 60 * 60 * 1000
const cookieBase = { sameSite: isProd ? 'none' : 'lax', secure: isProd, maxAge: MAX_AGE, path: '/' }

export function setAuthCookies(res, user) {
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret(), { expiresIn: '7d' })
  const csrf = crypto.randomBytes(24).toString('hex')
  res.cookie('token', token, { ...cookieBase, httpOnly: true })
  res.cookie('csrf', csrf, { ...cookieBase, httpOnly: false }) // readable by the SPA, echoed in a header
  return csrf
}

export function clearAuthCookies(res) {
  const o = { ...cookieBase, maxAge: undefined }
  res.clearCookie('token', { ...o, httpOnly: true })
  res.clearCookie('csrf', o)
}

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS'])

// Double-submit CSRF check for cookie-authenticated, state-changing requests.
function checkCsrf(req) {
  if (SAFE.has(req.method)) return
  const cookie = req.cookies?.csrf
  const header = req.get('x-csrf-token')
  if (!cookie || !header || cookie.length !== header.length ||
      !crypto.timingSafeEqual(Buffer.from(cookie), Buffer.from(header)))
    throw new ApiError(403, 'Invalid CSRF token')
}

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token
  if (!token) throw new ApiError(401, 'Please log in')
  let payload
  try { payload = jwt.verify(token, env.jwtSecret()) } catch { throw new ApiError(401, 'Session expired. Please log in again') }
  checkCsrf(req)
  const user = await User.findById(payload.sub)
  if (!user) throw new ApiError(401, 'Please log in')
  req.user = user
  next()
})

export const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user?.role) ? next() : next(new ApiError(403, 'You do not have permission to do this'))

export const staffOnly = [authenticate, requireRole('staff', 'admin')]
