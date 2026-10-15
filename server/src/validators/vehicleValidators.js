import { z } from 'zod'
import { VEHICLE_TYPES, FUEL_TYPES, CONDITIONS } from '../models/Vehicle.js'

const num = z.coerce.number().nonnegative()
const bool = z.enum(['true', 'false']).transform((v) => v === 'true')
const ci = (values) =>
  z.string().transform((v) => values.find((x) => x.toLowerCase() === v.toLowerCase()) ?? v)
    .pipe(z.enum(values))

export const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  q: z.string().trim().max(100).optional(),
  type: z.enum(VEHICLE_TYPES).optional(),
  category: z.enum(['passenger', 'commercial']).optional(),
  brand: z.string().trim().max(50).optional(),
  model: z.string().trim().max(50).optional(),
  minPrice: num.optional(),
  maxPrice: num.optional(),
  year: z.coerce.number().int().min(1980).max(2100).optional(),
  fuelType: ci(FUEL_TYPES).optional(),
  condition: z.enum(CONDITIONS).optional(),
  location: z.string().trim().max(50).optional(),
  featured: bool.optional(),
  sort: z.enum(['newest', 'price_asc', 'price_desc', 'year_desc']).default('newest'),
})
