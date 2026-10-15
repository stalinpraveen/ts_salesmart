import mongoose from 'mongoose'
import { env } from './env.js'

export async function connectDB() {
  mongoose.set('strictQuery', true)
  await mongoose.connect(env.mongoUri(), {
    serverSelectionTimeoutMS: 10000,
    dbName: process.env.MONGODB_DB || 'tssalesmart',
  })
  console.log('MongoDB connected')
}
