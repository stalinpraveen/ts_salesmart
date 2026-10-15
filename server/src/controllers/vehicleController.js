import mongoose from 'mongoose'
import { Vehicle } from '../models/Vehicle.js'
import { listQuerySchema } from '../validators/vehicleValidators.js'
import { buildPublicFilter, buildSort } from '../utils/vehicleQuery.js'
import { ApiError } from '../utils/ApiError.js'

export async function listVehicles(req, res) {
  const parsed = listQuerySchema.safeParse(req.query)
  if (!parsed.success) throw new ApiError(400, 'Invalid query parameters', parsed.error.flatten().fieldErrors)
  const q = parsed.data
  const filter = buildPublicFilter(q)
  const [items, total] = await Promise.all([
    Vehicle.find(filter).sort(buildSort(q.sort)).skip((q.page - 1) * q.limit).limit(q.limit).lean(),
    Vehicle.countDocuments(filter),
  ])
  res.json({
    success: true,
    data: items,
    pagination: { page: q.page, limit: q.limit, total, pages: Math.ceil(total / q.limit) },
  })
}

export async function getVehicle(req, res) {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) throw new ApiError(404, 'Vehicle not found')
  const vehicle = await Vehicle.findOne({ _id: id, status: { $in: ['available', 'reserved', 'sold'] } }).lean()
  if (!vehicle) throw new ApiError(404, 'Vehicle not found')
  const related = await Vehicle.find({ _id: { $ne: id }, status: 'available', type: vehicle.type })
    .sort({ createdAt: -1 }).limit(3).lean()
  res.json({ success: true, data: vehicle, related })
}
