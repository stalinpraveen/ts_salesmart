import { useState } from 'react'
import {
  ImagePlus,
  X,
  Loader2,
  Star,
  ArrowUpLeft,
  Eye,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'
import { api, errorMessage } from '../../services/api'
import { formatLKR, formatLKRWords, formatKm } from '../../utils/format'
import { ASSETS } from '../../utils/constants'

const EMPTY = {
  title: '',
  brand: '',
  model: '',
  type: 'car',
  category: '',
  year: new Date().getFullYear(),
  price: '',
  mileage: 0,
  fuelType: 'Petrol',
  transmission: 'Automatic',
  engineCapacity: '',
  condition: 'used',
  colour: '',
  seats: '',
  description: '',
  location: 'Chunnakam',
  status: 'available',
  featured: false,
  images: [],
}

const NUMERIC = ['year', 'price', 'mileage', 'engineCapacity', 'seats']

export default function VehicleForm({ vehicle, onSaved, onCancel }) {
  const [f, setF] = useState(vehicle ? { ...EMPTY, ...vehicle } : EMPTY)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const set = (k) => (e) =>
    setF({
      ...f,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    })

  const upload = async (files) => {
    if (!files || !files.length) return
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      files.forEach((file) => fd.append('images', file))
      const r = await api.post('/admin/uploads', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setF((p) => ({
        ...p,
        images: [...p.images, ...r.data.data].slice(0, 15),
      }))
    } catch (e) {
      setError(errorMessage(e, 'Image upload failed.'))
    } finally {
      setUploading(false)
    }
  }

  const setAsCover = (index) => {
    setF((prev) => {
      const imgs = [...prev.images]
      const [selected] = imgs.splice(index, 1)
      return { ...prev, images: [selected, ...imgs] }
    })
  }

  const removeImage = (index) => {
    setF((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer?.files?.length) {
      upload([...e.dataTransfer.files])
    }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setBusy(true)
    const body = {
      title: f.title.trim(),
      brand: f.brand.trim(),
      model: f.model.trim(),
      type: f.type,
      category: f.category,
      fuelType: f.fuelType,
      transmission: f.transmission,
      condition: f.condition,
      status: f.status,
      featured: !!f.featured,
      location: f.location || 'Chunnakam',
      description: f.description,
      colour: f.colour,
      images: f.images.map(({ url, publicId }) => ({ url, publicId })),
    }

    for (const k of NUMERIC) {
      if (f[k] !== '' && f[k] != null) body[k] = Number(f[k])
    }

    try {
      const r = vehicle?._id
        ? await api.patch(`/vehicles/${vehicle._id}`, body)
        : await api.post('/vehicles', body)
      onSaved(r.data.data)
    } catch (err) {
      const fields = err.response?.data?.errors
      setError(
        errorMessage(err) +
          (fields ? ` (${Object.keys(fields).join(', ')})` : '')
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start">
      {/* Main Editing Form */}
      <form
        onSubmit={submit}
        className="lg:col-span-8 space-y-6 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase text-ink">
              {vehicle?._id ? 'Edit Vehicle Details' : 'Add Vehicle to Showroom'}
            </h2>
            <p className="text-xs text-muted mt-0.5">
              Fill in all details. Photos and pricing will be displayed immediately to website visitors.
            </p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full p-2 text-gray-400 hover:text-ink hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Basic Identification */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            1. Title &amp; Classification
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="text-xs font-semibold text-gray-700">
                Vehicle Title *
                <input
                  type="text"
                  className="field mt-1"
                  value={f.title}
                  onChange={set('title')}
                  required
                  minLength={3}
                  placeholder="e.g. Toyota Raize G Grade 2024"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Brand / Make *
                <input
                  type="text"
                  className="field mt-1"
                  value={f.brand}
                  onChange={set('brand')}
                  required
                  placeholder="e.g. Toyota"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Model *
                <input
                  type="text"
                  className="field mt-1"
                  value={f.model}
                  onChange={set('model')}
                  required
                  placeholder="e.g. Raize"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Vehicle Type *
                <select className="field mt-1" value={f.type} onChange={set('type')}>
                  <option value="car">Car (Sedan / Hatchback)</option>
                  <option value="van">Van</option>
                  <option value="suv">SUV / Crossover</option>
                </select>
              </label>
            </div>

            {f.type === 'van' && (
              <div>
                <label className="text-xs font-semibold text-gray-700">
                  Van Category
                  <select className="field mt-1" value={f.category} onChange={set('category')}>
                    <option value="">N/A</option>
                    <option value="passenger">Passenger Van</option>
                    <option value="commercial">Commercial Van</option>
                  </select>
                </label>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Manufacturing Year *
                <input
                  type="number"
                  className="field mt-1"
                  value={f.year}
                  onChange={set('year')}
                  required
                  min="1980"
                  max="2030"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Condition *
                <select className="field mt-1" value={f.condition} onChange={set('condition')}>
                  <option value="new">Brand New Import</option>
                  <option value="used">Pre-Owned / Registered</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* Pricing & Odometer */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            2. Price &amp; Mileage
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Asking Price (LKR) *
                <input
                  type="number"
                  className="field mt-1"
                  value={f.price}
                  onChange={set('price')}
                  required
                  min="0"
                  step="10000"
                  placeholder="e.g. 11500000"
                />
              </label>
              {f.price > 0 && (
                <p className="mt-1.5 text-xs font-bold text-brand">
                  = {formatLKR(f.price)} ({formatLKRWords(f.price)})
                </p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Mileage (km)
                <input
                  type="number"
                  className="field mt-1"
                  value={f.mileage}
                  onChange={set('mileage')}
                  min="0"
                  placeholder="e.g. 15000"
                />
              </label>
              {f.mileage > 0 && (
                <p className="mt-1.5 text-xs text-muted font-medium">
                  = {formatKm(f.mileage)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
            3. Specifications &amp; Features
          </h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Fuel Type
                <select className="field mt-1" value={f.fuelType} onChange={set('fuelType')}>
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>Hybrid</option>
                  <option>Electric</option>
                </select>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Transmission
                <select className="field mt-1" value={f.transmission} onChange={set('transmission')}>
                  <option>Automatic</option>
                  <option>Manual</option>
                </select>
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Engine Capacity (cc)
                <input
                  type="number"
                  className="field mt-1"
                  value={f.engineCapacity}
                  onChange={set('engineCapacity')}
                  placeholder="e.g. 1000"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Exterior Colour
                <input
                  type="text"
                  className="field mt-1"
                  value={f.colour}
                  onChange={set('colour')}
                  placeholder="e.g. Pearl White"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Seating Capacity
                <input
                  type="number"
                  className="field mt-1"
                  value={f.seats}
                  onChange={set('seats')}
                  placeholder="e.g. 5"
                />
              </label>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Showroom Location
                <input
                  type="text"
                  className="field mt-1"
                  value={f.location}
                  onChange={set('location')}
                  placeholder="Chunnakam"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-xs font-semibold text-gray-700">
            Showroom Description &amp; Options
            <textarea
              rows="4"
              className="field mt-1 font-normal"
              value={f.description || ''}
              onChange={set('description')}
              maxLength={5000}
              placeholder="Provide vehicle highlights, options, safety package, registration status, etc."
            />
          </label>
        </div>

        {/* Photos Management */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                4. Vehicle Photos ({f.images.length}/15)
              </h3>
              <p className="text-[11px] text-gray-500">
                First photo will be the main cover picture on website cards.
              </p>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {f.images.map((img, i) => (
              <div
                key={img.url + i}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition ${
                  i === 0 ? 'border-brand shadow-md' : 'border-gray-200'
                }`}
              >
                <img src={img.url} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />

                {/* Badge if cover */}
                {i === 0 ? (
                  <span className="absolute bottom-1.5 left-1.5 rounded-md bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    COVER
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setAsCover(i)}
                    className="absolute bottom-1.5 left-1.5 rounded-md bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-brand transition cursor-pointer"
                    title="Set as Cover Photo"
                  >
                    Set Cover
                  </button>
                )}

                {/* Remove button */}
                <button
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => removeImage(i)}
                  className="absolute right-1.5 top-1.5 rounded-full bg-black/75 p-1 text-white hover:bg-brand transition cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            ))}

            {/* Upload Drop Zone Box */}
            <label
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`flex flex-col items-center justify-center aspect-[4/3] cursor-pointer rounded-xl border-2 border-dashed transition p-3 text-center ${
                dragOver
                  ? 'border-brand bg-red-50/50'
                  : 'border-gray-300 hover:border-brand hover:bg-gray-50'
              }`}
            >
              {uploading ? (
                <>
                  <Loader2 size={24} className="animate-spin text-brand mb-1" />
                  <span className="text-xs text-muted font-medium">Uploading to Cloud...</span>
                </>
              ) : (
                <>
                  <ImagePlus size={24} className="text-gray-400 mb-1" />
                  <span className="text-xs font-bold text-ink">Add Photos</span>
                  <span className="text-[10px] text-muted">Click or drag &amp; drop</span>
                </>
              )}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                hidden
                disabled={uploading}
                onChange={(e) => {
                  upload([...e.target.files])
                  e.target.value = ''
                }}
              />
            </label>
          </div>
        </div>

        {/* Availability & Featured Settings */}
        <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block">
                Availability Status
              </label>
              <select
                className="field mt-1 !w-auto text-xs font-bold"
                value={f.status}
                onChange={set('status')}
              >
                <option value="available">Available for Sale</option>
                <option value="reserved">Reserved by Customer</option>
                <option value="sold">Sold</option>
                <option value="archived">Archived (Hidden)</option>
              </select>
            </div>

            <label className="flex items-center gap-2 pt-5 text-xs font-bold text-gray-800 cursor-pointer">
              <input
                type="checkbox"
                checked={!!f.featured}
                onChange={set('featured')}
                className="h-4 w-4 rounded accent-brand"
              />
              <span>Feature on Home Page</span>
            </label>
          </div>
        </div>

        {error && (
          <div role="alert" className="rounded-xl bg-red-50 border border-red-200 p-3 text-xs text-brand font-medium">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={busy || uploading}
            className="btn-primary !px-6 !py-3 text-sm font-bold shadow-md cursor-pointer disabled:opacity-60"
          >
            {busy ? 'Saving...' : vehicle?._id ? 'Update Vehicle' : 'Publish Vehicle'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline-dark !px-5 !py-3 text-sm cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Live Preview Card on the Side */}
      <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
            <Eye size={14} className="text-brand" /> Live Customer Preview
          </span>
          <span className="badge bg-surface text-gray-600 text-[10px]">What Buyers See</span>
        </div>

        {/* Preview Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="relative aspect-[4/3] bg-surface">
            <img
              src={f.images[0]?.url || ASSETS.logo}
              alt="Preview"
              className={`h-full w-full ${f.images.length ? 'object-cover' : 'object-contain p-8'}`}
            />
            <div className="absolute left-3 top-3 flex gap-1">
              <span className="badge bg-neutral-900/90 text-white text-[10px] font-bold">
                {f.condition === 'new' ? 'Brand New' : 'Pre-Owned'}
              </span>
              {f.status !== 'available' && (
                <span className="badge bg-brand text-white text-[10px] font-bold uppercase">
                  {f.status}
                </span>
              )}
            </div>
            {f.images.length > 1 && (
              <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-0.5 text-[10px] text-white">
                {f.images.length} Photos
              </span>
            )}
          </div>

          <div className="p-4 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
              {f.brand || 'BRAND'}
            </p>
            <h4 className="font-bold text-base text-ink truncate">
              {f.model || 'Model'} <span className="font-semibold text-gray-500">{f.year}</span>
            </h4>
            <p className="text-xl font-black text-brand">
              {f.price ? formatLKR(f.price) : 'Rs. 0'}
            </p>
            {f.price > 0 && (
              <p className="text-[11px] font-semibold text-gray-400">
                {formatLKRWords(f.price)}
              </p>
            )}

            <div className="grid grid-cols-3 gap-1 pt-2 border-t border-gray-100 text-[11px] text-muted">
              <span className="truncate">{formatKm(f.mileage)}</span>
              <span className="truncate">{f.fuelType}</span>
              <span className="truncate">{f.transmission}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
