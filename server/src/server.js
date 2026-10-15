import { env } from './config/env.js'
import { connectDB } from './config/db.js'
import { createApp } from './app.js'

try {
  await connectDB()
} catch (err) {
  console.error('MongoDB connection failed:', err.message)
  console.error('Check MONGODB_URI in server/.env and your Atlas IP allow-list.')
  process.exit(1)
}

createApp().listen(env.port, () => console.log(`TS SALES MART API on http://localhost:${env.port}`))
