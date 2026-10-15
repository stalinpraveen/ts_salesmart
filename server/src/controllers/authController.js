import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { User } from '../models/User.js'
import { ApiError } from '../utils/ApiError.js'
import { setAuthCookies, clearAuthCookies } from '../middleware/auth.js'

const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().toLowerCase().email().max(200),
  password: z.string().min(8).max(100),
})
const loginSchema = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1).max(100) })

const parse = (schema, body) => {
  const r = schema.safeParse(body)
  if (!r.success) throw new ApiError(400, 'Please check the form and try again', r.error.flatten().fieldErrors)
  return r.data
}
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email, role: u.role })

// A hash of a random string so login timing doesn't reveal whether an email exists.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12)

export async function register(req, res) {
  const { name, email, password } = parse(registerSchema, req.body)
  if (await User.exists({ email })) throw new ApiError(409, 'An account with this email already exists')
  // Role is always 'customer' here; staff accounts are created by an administrator only.
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12), role: 'customer' })
  setAuthCookies(res, user)
  res.status(201).json({ success: true, data: publicUser(user) })
}

export async function login(req, res) {
  const { email, password } = parse(loginSchema, req.body)
  const user = await User.findOne({ email }).select('+passwordHash')
  const ok = await bcrypt.compare(password, user?.passwordHash || DUMMY_HASH)
  if (!user || !ok) throw new ApiError(401, 'Incorrect email or password')
  setAuthCookies(res, user)
  res.json({ success: true, data: publicUser(user) })
}

export function logout(req, res) {
  clearAuthCookies(res)
  res.json({ success: true })
}

export function me(req, res) {
  res.json({ success: true, data: publicUser(req.user) })
}
