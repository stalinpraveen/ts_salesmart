import 'dotenv/config'
import mongoose from 'mongoose'
import { connectDB } from './config/db.js'
import { Vehicle } from './models/Vehicle.js'

await connectDB()
const result = await Vehicle.deleteMany({})
console.log(`Successfully deleted ${result.deletedCount} vehicle(s) from the database.`)
await mongoose.disconnect()
