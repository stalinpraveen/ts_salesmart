import mongoose from 'mongoose'
import { Vehicle } from '../models/Vehicle.js'
import { Inquiry } from '../models/Inquiry.js'
import { ApiError } from '../utils/ApiError.js'
import { uploadImage, deleteImages } from '../services/cloudinaryService.js'
import { vehicleBodySchema, vehicleUpdateSchema, statusSchema, inquirySchema, inquiryStatusSchema } from '../validators/bodyValidators.js'

const parse = (schema, body) => {
  const r = schema.safeParse(body)
  if (!r.success) throw new ApiError(400, 'Please check the form and try again', r.error.flatten().fieldErrors)
  return r.data
}
const validId = (id) => { if (!mongoose.isValidObjectId(id)) throw new ApiError(404, 'Not found') }

// ---- Vehicles (staff) ----
export async function createVehicle(req, res) {
  const vehicle = await Vehicle.create(parse(vehicleBodySchema, req.body))
  res.status(201).json({ success: true, data: vehicle })
}

export async function updateVehicle(req, res) {
  validId(req.params.id)
  const data = parse(vehicleUpdateSchema, req.body)
  const existing = await Vehicle.findById(req.params.id)
  if (!existing) throw new ApiError(404, 'Vehicle not found')
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { $set: data }, { returnDocument: 'after', runValidators: true })
  if (data.images) {
    const keep = new Set(data.images.map((i) => i.publicId))
    await deleteImages(existing.images.map((i) => i.publicId).filter((id) => id && !keep.has(id)))
  }
  res.json({ success: true, data: vehicle })
}

export async function uploadImages(req, res) {
  if (!req.files?.length) throw new ApiError(400, 'No images were uploaded')
  const data = await Promise.all(req.files.map((f) => uploadImage(f.buffer)))
  res.status(201).json({ success: true, data })
}

// DELETE archives rather than destroying records; hidden from the public site.
export async function archiveVehicle(req, res) {
  validId(req.params.id)
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { status: 'archived', featured: false }, { returnDocument: 'after' })
  if (!vehicle) throw new ApiError(404, 'Vehicle not found')
  res.json({ success: true, data: vehicle })
}

// Permanently delete a vehicle and its Cloudinary images
export async function deleteVehicle(req, res) {
  validId(req.params.id)
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id)
  if (!vehicle) throw new ApiError(404, 'Vehicle not found')
  if (vehicle.images?.length) {
    await deleteImages(vehicle.images.map((i) => i.publicId).filter(Boolean))
  }
  res.json({ success: true, message: 'Vehicle deleted permanently' })
}

export async function setVehicleStatus(req, res) {
  validId(req.params.id)
  const { status } = parse(statusSchema, req.body)
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' })
  if (!vehicle) throw new ApiError(404, 'Vehicle not found')
  res.json({ success: true, data: vehicle })
}

export async function adminListVehicles(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20))
  const filter = {}
  if (typeof req.query.status === 'string') filter.status = req.query.status
  const [data, total] = await Promise.all([
    Vehicle.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Vehicle.countDocuments(filter),
  ])
  res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
}

export async function dashboard(req, res) {
  const [byStatus, newInquiries, totalInquiries] = await Promise.all([
    Vehicle.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Inquiry.countDocuments({ status: 'new' }),
    Inquiry.countDocuments(),
  ])
  const vehicles = Object.fromEntries(byStatus.map((s) => [s._id, s.count]))
  res.json({ success: true, data: { vehicles, newInquiries, totalInquiries } })
}

// ---- Inquiries ----
export async function createInquiry(req, res) {
  const data = parse(inquirySchema, req.body)
  if (data.vehicle && !(await Vehicle.exists({ _id: data.vehicle }))) throw new ApiError(400, 'Vehicle not found')
  if (!data.email) delete data.email
  await Inquiry.create(data)
  res.status(201).json({ success: true, message: 'Thank you. Our team will contact you soon.' })
}

export async function adminListInquiries(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1)
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20))
  const filter = typeof req.query.status === 'string' ? { status: req.query.status } : {}
  const [data, total] = await Promise.all([
    Inquiry.find(filter).populate('vehicle', 'title brand model').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    Inquiry.countDocuments(filter),
  ])
  res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } })
}

export async function updateInquiry(req, res) {
  validId(req.params.id)
  const { status } = parse(inquiryStatusSchema, req.body)
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after' })
  if (!inquiry) throw new ApiError(404, 'Inquiry not found')
  res.json({ success: true, data: inquiry })
}

