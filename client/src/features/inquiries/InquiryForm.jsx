import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'
import { sendInquiry } from '../vehicles/vehicleService'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid phone number'),
  email: z.string().trim().email('Enter a valid email').or(z.literal('')),
  message: z.string().trim().min(5, 'Please write a short message'),
})

function Field({ id, label, error: err, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold">{label}</label>
      {children}
      {err && <p role="alert" className="mt-1 text-xs text-brand">{err.message}</p>}
    </div>
  )
}

export default function InquiryForm({ vehicle, defaultMessage = '' }) {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', phone: '', email: '', message: defaultMessage },
  })

  const onSubmit = async (values) => {
    setError('')
    try {
      await sendInquiry({ ...values, ...(vehicle ? { vehicle } : {}) })
      setDone(true)
      reset()
    } catch (e) {
      setError(e.response?.data?.message || 'Could not send your enquiry. Please call us instead.')
    }
  }

  if (done)
    return (
      <div role="status" className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
        <CheckCircle2 className="mx-auto text-green-600" />
        <p className="mt-2 font-semibold">Thank you. Your enquiry has been received.</p>
        <p className="text-sm text-muted">Our team will contact you soon.</p>
        <button type="button" onClick={() => setDone(false)} className="mt-3 text-sm font-semibold text-brand">Send another</button>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
      <Field id="inq-name" label="Your name" error={errors.name}><input id="inq-name" className="field mt-1" autoComplete="name" {...register('name')} /></Field>
      <Field id="inq-phone" label="Phone number" error={errors.phone}><input id="inq-phone" className="field mt-1" autoComplete="tel" {...register('phone')} /></Field>
      <Field id="inq-email" label="Email (optional)" error={errors.email}><input id="inq-email" type="email" className="field mt-1" autoComplete="email" {...register('email')} /></Field>
      <Field id="inq-message" label="Message" error={errors.message}><textarea id="inq-message" rows="4" className="field mt-1" {...register('message')} /></Field>
      {error && <p role="alert" className="text-sm text-brand">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">{isSubmitting ? 'Sending…' : 'Send Inquiry'}</button>
    </form>
  )
}
