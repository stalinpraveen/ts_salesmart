import mongoose from 'mongoose'

export const VEHICLE_TYPES = ['car', 'van', 'suv']
export const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric']
export const TRANSMISSIONS = ['Automatic', 'Manual']
export const CONDITIONS = ['new', 'used']
export const STATUSES = ['available', 'reserved', 'sold', 'archived']

const imageSchema = new mongoose.Schema(
  { url: { type: String, required: true }, publicId: String },
  { _id: false },
)

const vehicleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 140 },
    brand: { type: String, required: true, trim: true, index: true },
    model: { type: String, required: true, trim: true },
    type: { type: String, enum: VEHICLE_TYPES, required: true, index: true },
    category: { type: String, enum: ['passenger', 'commercial', ''], default: '' },
    year: { type: Number, required: true, min: 1980, max: 2100 },
    price: { type: Number, required: true, min: 0 },
    mileage: { type: Number, default: 0, min: 0 },
    fuelType: { type: String, enum: FUEL_TYPES, required: true },
    transmission: { type: String, enum: TRANSMISSIONS, required: true },
    engineCapacity: { type: Number, min: 0 },
    condition: { type: String, enum: CONDITIONS, required: true },
    colour: { type: String, trim: true },
    seats: { type: Number, min: 1, max: 60 },
    description: { type: String, trim: true, maxlength: 5000 },
    location: { type: String, trim: true, default: 'Chunnakam' },
    images: { type: [imageSchema], default: [] },
    status: { type: String, enum: STATUSES, default: 'available', index: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true },
)

vehicleSchema.index({ status: 1, createdAt: -1 })
vehicleSchema.index({ price: 1 })

export const Vehicle = mongoose.model('Vehicle', vehicleSchema)
