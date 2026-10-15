import { useState } from 'react'
import { ImagePlus, X, Loader2 } from 'lucide-react'
import { api, errorMessage } from '../../services/api'

const EMPTY = {
  title: '', brand: '', model: '', type: 'car', category: '', year: new Date().getFullYear(), price: '', mileage: 0,
  fuelType: 'Petrol', transmission: 'Automatic', engineCapacity: '', condition: 'used', colour: '', seats: '',
  description: '', location: 'Chunnakam', status: 'available', featured: false, images: [],
}

function Input({ f, set, k, label, type = 'text', ...rest }) {
  return (
    <label className="text-xs font-semibold">{label}
      <input type={type} className="field mt-1" value={f[k] ?? ''} onChange={set(k)} {...rest} /></label>
  )
}

function Select({ f, set, k, label, options }) {
  return (
    <label className="text-xs font-semibold">{label}
      <select className="field mt-1" value={f[k]} onChange={set(k)}>
        {options.map((o) => { const [v, l] = Array.isArray(o) ? o : [o, o]; return <option key={v} value={v}>{l}</option> })}
      </select></label>
  )
}

const NUMERIC = ['year', 'price', 'mileage', 'engineCapacity', 'seats']

export default function VehicleForm({ vehicle, onSaved, onCancel }) {
  const [f, setF] = useState(vehicle ? { ...EMPTY, ...vehicle } : EMPTY)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const upload = async (files) => {
    if (!files.length) return
    setError(''); setUploading(true)
    try {
      const fd = new FormData()
      files.forEach((file) => fd.append('images', file))
      const r = await api.post('/admin/uploads', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
      setF((p) => ({ ...p, images: [...p.images, ...r.data.data].slice(0, 12) }))
    } catch (e) { setError(errorMessage(e, 'Image upload failed.')) } finally { setUploading(false) }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setBusy(true)
    const body = {
      title: f.title, brand: f.brand, model: f.model, type: f.type, category: f.category,
      fuelType: f.fuelType, transmission: f.transmission, condition: f.condition, status: f.status,
      featured: !!f.featured, location: f.location, description: f.description, colour: f.colour,
      images: f.images.map(({ url, publicId }) => ({ url, publicId })),
    }
    for (const k of NUMERIC) if (f[k] !== '' && f[k] != null) body[k] = Number(f[k])
    try {
      const r = vehicle?._id ? await api.patch(`/vehicles/${vehicle._id}`, body) : await api.post('/vehicles', body)
      onSaved(r.data.data)
    } catch (err) {
      const fields = err.response?.data?.errors
      setError(errorMessage(err) + (fields ? ` (${Object.keys(fields).join(', ')})` : ''))
    } finally { setBusy(false) }
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="font-display text-2xl font-bold uppercase">{vehicle?._id ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3"><Input f={f} set={set} k="title" label="Title" required minLength={3} placeholder="e.g. Toyota Raize 2024" /></div>
        <Input f={f} set={set} k="brand" label="Brand" required /><Input f={f} set={set} k="model" label="Model" required />
        <Select f={f} set={set} k="type" label="Vehicle type" options={[['car', 'Car'], ['van', 'Van'], ['suv', 'SUV']]} />
        <Select f={f} set={set} k="category" label="Van category" options={[['', 'N/A'], ['passenger', 'Passenger'], ['commercial', 'Commercial']]} />
        <Input f={f} set={set} k="year" label="Manufacturing year" type="number" required min="1980" />
        <Input f={f} set={set} k="price" label="Price (LKR)" type="number" required min="0" />
        <Input f={f} set={set} k="mileage" label="Mileage (km)" type="number" min="0" />
        <Select f={f} set={set} k="fuelType" label="Fuel type" options={['Petrol', 'Diesel', 'Hybrid', 'Electric']} />
        <Select f={f} set={set} k="transmission" label="Transmission" options={['Automatic', 'Manual']} />
        <Input f={f} set={set} k="engineCapacity" label="Engine capacity (cc)" type="number" min="0" />
        <Select f={f} set={set} k="condition" label="Condition" options={[['new', 'New'], ['used', 'Pre-owned']]} />
        <Input f={f} set={set} k="colour" label="Colour" /><Input f={f} set={set} k="seats" label="Seats" type="number" min="1" />
        <Input f={f} set={set} k="location" label="Location" />
        <Select f={f} set={set} k="status" label="Availability" options={['available', 'reserved', 'sold', 'archived']} />
        <label className="flex items-center gap-2 self-end pb-2 text-sm font-semibold"><input type="checkbox" checked={!!f.featured} onChange={set('featured')} />Featured on home page</label>
      </div>
      <label className="block text-xs font-semibold">Description
        <textarea rows="4" className="field mt-1" value={f.description || ''} onChange={set('description')} maxLength={5000} /></label>

      <div>
        <p className="text-xs font-semibold">Photos (JPG, PNG or WebP, up to 5 MB each)</p>
        <div className="mt-2 flex flex-wrap gap-3">
          {f.images.map((img, i) => (
            <div key={img.url} className="relative h-24 w-32 overflow-hidden rounded-lg border">
              <img src={img.url} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
              <button type="button" aria-label="Remove photo" onClick={() => setF({ ...f, images: f.images.filter((_, j) => j !== i) })} className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"><X size={12} /></button>
              {i === 0 && <span className="absolute bottom-1 left-1 rounded bg-brand px-1.5 text-[10px] font-bold text-white">MAIN</span>}
            </div>
          ))}
          <label className="grid h-24 w-32 cursor-pointer place-items-center rounded-lg border-2 border-dashed border-gray-300 text-xs text-muted hover:border-brand">
            {uploading ? <Loader2 className="animate-spin" /> : <span className="text-center"><ImagePlus className="mx-auto" />Add photos</span>}
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden disabled={uploading} onChange={(e) => { upload([...e.target.files]); e.target.value = '' }} />
          </label>
        </div>
      </div>

      {error && <p role="alert" className="text-sm text-brand">{error}</p>}
      <div className="flex gap-3">
        <button type="submit" disabled={busy || uploading} className="btn-primary disabled:opacity-60">{busy ? 'Saving…' : 'Save Vehicle'}</button>
        <button type="button" onClick={onCancel} className="btn-outline-dark">Cancel</button>
      </div>
    </form>
  )
}
