import { z } from 'zod'
import { VEHICLE_TYPES, FUEL_TYPES, TRANSMISSIONS, CONDITIONS, STATUSES } from '../models/Vehicle.js'

const image = z.object({
  url: z.string().url().max(500).startsWith('https://res.cloudinary.com/'),
  publicId: z.string().max(200).optional(),
})

export const vehicleBodySchema = z.object({
  title: z.string().trim().min(3).max(140),
  brand: z.string().trim().min(1).max(50),
  model: z.string().trim().min(1).max(50),
  type: z.enum(VEHICLE_TYPES),
  category: z.enum(['passenger', 'commercial', '']).optional(),
  year: z.coerce.number().int().min(1980).max(2100),
  price: z.coerce.number().min(0).max(1e10),
  mileage: z.coerce.number().min(0).max(5e6).optional(),
  fuelType: z.enum(FUEL_TYPES),
  transmission: z.enum(TRANSMISSIONS),
  engineCapacity: z.coerce.number().min(0).max(20000).optional(),
  condition: z.enum(CONDITIONS),
  colour: z.string().trim().max(40).optional(),
  seats: z.coerce.number().int().min(1).max(60).optional(),
  description: z.string().trim().max(5000).optional(),
  location: z.string().trim().max(80).optional(),
  images: z.array(image).max(12).optional(),
  status: z.enum(STATUSES).optional(),
  featured: z.boolean().optional(),
}).strict()

export const vehicleUpdateSchema = vehicleBodySchema.partial()
export const statusSchema = z.object({ status: z.enum(STATUSES) }).strict()

export const inquirySchema = z.object({
  vehicle: z.string().regex(/^[a-f\d]{24}$/i).optional(),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number'),
  email: z.string().trim().toLowerCase().email().max(200).optional().or(z.literal('')),
  message: z.string().trim().min(5).max(2000),
}).strict()

export const inquiryStatusSchema = z.object({ status: z.enum(['new', 'contacted', 'closed']) }).strict()
