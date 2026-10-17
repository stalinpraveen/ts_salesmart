import 'dotenv/config'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { User } from './models/User.js'

const email = (process.env.SEED_ADMIN_EMAIL || '').trim().toLowerCase()
const password = process.env.SEED_ADMIN_PASSWORD || ''

if (!email || password.length < 8) {
  console.error('Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (min 8 characters) in server/.env first.')
  process.exit(1)
}

await connectDB()
const passwordHash = await bcrypt.hash(password, 12)
await User.findOneAndUpdate(
  { email },
  { $set: { name: 'Administrator', role: 'admin', passwordHash } },
  { upsert: true, setDefaultsOnInsert: true },
)
console.log(`Admin account ready: ${email}`)
console.log('No demonstration vehicles are created. Add real stock from the admin dashboard.')
await mongoose.disconnect()
