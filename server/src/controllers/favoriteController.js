import mongoose from 'mongoose'
import { Favorite } from '../models/Favorite.js'
import { Vehicle } from '../models/Vehicle.js'
import { ApiError } from '../utils/ApiError.js'

export async function getFavorites(req, res) {
  const userId = req.user._id
  const favorites = await Favorite.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({
      path: 'vehicle',
      match: { status: 'available' },
    })
    .lean()

  const validFavorites = favorites.filter((f) => f.vehicle != null)
  const data = validFavorites.map((f) => f.vehicle)
  const ids = validFavorites.map((f) => f.vehicle._id.toString())

  res.json({ success: true, data, ids })
}

export async function addFavorite(req, res) {
  const { vehicleId } = req.params
  if (!mongoose.isValidObjectId(vehicleId)) throw new ApiError(400, 'Invalid vehicle ID')

  const exists = await Vehicle.exists({ _id: vehicleId })
  if (!exists) throw new ApiError(404, 'Vehicle not found')

  await Favorite.findOneAndUpdate(
    { user: req.user._id, vehicle: vehicleId },
    { $set: { user: req.user._id, vehicle: vehicleId } },
    { upsert: true, returnDocument: 'after' },
  )

  res.status(201).json({ success: true, vehicleId })
}

export async function removeFavorite(req, res) {
  const { vehicleId } = req.params
  if (!mongoose.isValidObjectId(vehicleId)) throw new ApiError(400, 'Invalid vehicle ID')

  await Favorite.findOneAndDelete({ user: req.user._id, vehicle: vehicleId })
  res.json({ success: true, vehicleId })
}
