import { useState } from 'react'
import { ImagePlus, X, Loader2, Car, Settings2, DollarSign, Camera } from 'lucide-react'
import { api, errorMessage } from '../../services/api'

const CURRENT_YEAR = new Date().getFullYear()

const EMPTY = {
  title: '',
  brand: '',
  model: '',
  type: 'car',
  category: '',
  year: CURRENT_YEAR,
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

function Input({ f, set, k, label, type = 'text', ...rest }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      <input
        type={type}
        className="field mt-1 font-medium"
        value={f[k] ?? ''}
        onChange={set(k)}
        {...rest}
      />
    </div>
  )
}

function Select({ f, set, k, label, options }) {
  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      <select className="field mt-1 font-medium" value={f[k]} onChange={set(k)}>
        {options.map((o) => {
          const [v, l] = Array.isArray(o) ? o : [o, o]
          return (
            <option key={v} value={v}>
              {l}
            </option>
          )
        })}
      </select>
    </div>
  )
}

const NUMERIC = ['year', 'price', 'mileage', 'engineCapacity', 'seats']

export default function VehicleForm({ vehicle, onSaved, onCancel }) {
  const [f, setF] = useState(vehicle ? { ...EMPTY, ...vehicle } : EMPTY)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) =>
    setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const upload = async (files) => {
    if (!files.length) return
    setError('')
    setUploading(true)
    try {
      const fd = new FormData()
      files.forEach((file) => fd.append('images', file))
      const r = await api.post('/admin/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setF((p) => ({ ...p, images: [...p.images, ...r.data.data].slice(0, 12) }))
    } catch (e) {
      setError(errorMessage(e, 'Image upload failed. Please verify image size is under 5MB.'))
    } finally {
      setUploading(false)
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
      location: f.location.trim() || 'Chunnakam',
      description: f.description.trim(),
      colour: f.colour.trim(),
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
      setError(errorMessage(err) + (fields ? ` (${Object.keys(fields).join(', ')})` : ''))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="space-y-8 rounded-3xl border border-neutral-200 bg-white p-6 sm:p-10 shadow-xl shadow-black/5"
    >
      <div className="flex items-center justify-between border-b border-neutral-100 pb-5">
        <div>
          <span className="eyebrow">Inventory Console</span>
          <h2 className="font-display text-3xl font-extrabold uppercase mt-1">
            {vehicle?._id ? 'Edit Vehicle Details' : 'Publish New Vehicle'}
          </h2>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border border-neutral-200 p-2 text-neutral-400 hover:text-neutral-800 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Section 1: Core Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
          <Car size={16} className="text-brand" />
          <span>Vehicle Identity</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="sm:col-span-2 lg:col-span-3">
            <Input
              f={f}
              set={set}
              k="title"
              label="Listing Title"
              required
              minLength={3}
              placeholder="e.g. Toyota Raize Z Grade 2024"
            />
          </div>
          <Input f={f} set={set} k="brand" label="Make / Brand" required placeholder="e.g. Toyota" />
          <Input f={f} set={set} k="model" label="Model" required placeholder="e.g. Raize" />
          <Select
            f={f}
            set={set}
            k="type"
            label="Body Type"
            options={[
              ['car', 'Car (Sedan/Hatchback)'],
              ['van', 'Van (Passenger/Commercial)'],
              ['suv', 'SUV / Jeep / Crossover'],
            ]}
          />
          <Select
            f={f}
            set={set}
            k="category"
            label="Van Category (If applicable)"
            options={[
              ['', 'Not Applicable'],
              ['passenger', 'Passenger Van'],
              ['commercial', 'Commercial / Cargo Van'],
            ]}
          />
          <Input
            f={f}
            set={set}
            k="year"
            label="Year of Manufacture"
            type="number"
            required
            min="1980"
            max={CURRENT_YEAR + 1}
          />
          <Select
            f={f}
            set={set}
            k="condition"
            label="Vehicle Condition"
            options={[
              ['new', 'Brand New (Unregistered)'],
              ['used', 'Pre-Owned (Registered)'],
            ]}
          />
        </div>
      </div>

      {/* Section 2: Pricing & Availability */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
          <DollarSign size={16} className="text-brand" />
          <span>Pricing &amp; Status</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            f={f}
            set={set}
            k="price"
            label="Price in LKR"
            type="number"
            required
            min="0"
            placeholder="e.g. 7850000"
          />
          <Select
            f={f}
            set={set}
            k="status"
            label="Showroom Status"
            options={[
              ['available', 'Available in Showroom'],
              ['reserved', 'Reserved / Pending Deposit'],
              ['sold', 'Sold Out'],
              ['archived', 'Archived / Hidden'],
            ]}
          />
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="featured-check"
              checked={!!f.featured}
              onChange={set('featured')}
              className="h-4 w-4 rounded text-brand focus:ring-brand"
            />
            <label htmlFor="featured-check" className="text-xs font-bold text-neutral-800 cursor-pointer">
              Feature on Home Page Spotlight
            </label>
          </div>
        </div>
      </div>

      {/* Section 3: Technical Specifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-900 border-b border-neutral-100 pb-2">
          <Settings2 size={16} className="text-brand" />
          <span>Technical Specifications</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input f={f} set={set} k="mileage" label="Mileage (km)" type="number" min="0" placeholder="e.g. 15000" />
          <Select
            f={f}
            set={set}
            k="fuelType"
            label="Fuel Type"
            options={['Petrol', 'Diesel', 'Hybrid', 'Electric']}
          />
          <Select
            f={f}
            set={set}
            k="transmission"
            label="Transmission"
            options={['Automatic', 'Manual']}
          />
          <Input
            f={f}
            set={set}
            k="engineCapacity"
            label="Engine Capacity (cc)"
            type="number"
            min="0"
            placeholder="e.g. 998"
          />
          <Input f={f} set={set} k="colour" label="Exterior Colour" placeholder="e.g. Pearl White" />
          <Input f={f} set={set} k="seats" label="Seating Capacity" type="number" min="1" placeholder="e.g. 5" />
          <Input f={f} set={set} k="location" label="Showroom Location" placeholder="Chunnakam" />
        </div>
      </div>

      {/* Section 4: Marketing Description */}
      <div className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
          Vehicle Description &amp; Equipment
        </label>
        <textarea
          rows="4"
          className="field font-medium leading-relaxed"
          value={f.description || ''}
          onChange={set('description')}
          maxLength={5000}
          placeholder="Describe vehicle features, equipment, registration status, options, inspection condition..."
        />
      </div>

      {/* Section 5: High Resolution Photography */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
            <Camera size={16} className="text-brand" />
            <span>Showroom Photographs</span>
          </div>
          <span className="text-xs text-neutral-400">Up to 12 images (JPG, PNG, WebP)</span>
        </div>

        <div className="flex flex-wrap gap-4">
          {f.images.map((img, i) => (
            <div
              key={img.url}
              className="relative aspect-[16/10] w-36 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm"
            >
              <img src={img.url} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Remove photo"
                onClick={() => setF({ ...f, images: f.images.filter((_, j) => j !== i) })}
                className="absolute right-1.5 top-1.5 grid h-6 w-6 place-items-center rounded-full bg-black/75 text-white hover:bg-brand transition cursor-pointer"
              >
                <X size={12} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1.5 left-1.5 rounded-md bg-brand px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-xs">
                  Main Photo
                </span>
              )}
            </div>
          ))}

          <label className="grid aspect-[16/10] w-36 cursor-pointer place-items-center rounded-2xl border-2 border-dashed border-neutral-300 text-xs font-semibold text-neutral-500 hover:border-brand hover:text-brand hover:bg-neutral-50 transition">
            {uploading ? (
              <Loader2 className="animate-spin text-brand" size={24} />
            ) : (
              <div className="text-center p-2">
                <ImagePlus className="mx-auto mb-1 text-neutral-400" size={22} />
                <span>Upload Photos</span>
              </div>
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

      {error && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-brand">
          {error}
        </div>
      )}

      {/* Form Submission Actions */}
      <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
        <button
          type="submit"
          disabled={busy || uploading}
          className="btn-primary !py-3 !px-7 text-sm font-bold shadow-lg shadow-red-950/20 disabled:opacity-50"
        >
          {busy ? 'Saving Listing…' : vehicle?._id ? 'Update Listing' : 'Publish to Showroom'}
        </button>
        <button type="button" onClick={onCancel} className="btn-outline-dark !py-3 !px-6 text-sm font-semibold">
          Cancel
        </button>
      </div>
    </form>
  )
}
