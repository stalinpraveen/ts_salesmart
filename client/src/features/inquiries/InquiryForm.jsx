import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Send, Loader2 } from 'lucide-react'
import { sendInquiry } from '../vehicles/vehicleService'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name'),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,20}$/, 'Enter a valid telephone number'),
  email: z.string().trim().email('Enter a valid email address').or(z.literal('')),
  message: z.string().trim().min(5, 'Please write a message with at least 5 characters'),
})

function Field({ id, label, error: err, children }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
        {label}
      </label>
      {children}
      {err && <p role="alert" className="mt-1 text-xs text-brand font-semibold">{err.message}</p>}
    </div>
  )
}

export default function InquiryForm({ vehicle, defaultMessage = '' }) {
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
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
      setError(e.response?.data?.message || 'Could not deliver your inquiry right now. Please call us directly.')
    }
  }

  if (done) {
    return (
      <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-center animate-in fade-in">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600 mb-2">
          <CheckCircle2 size={24} />
        </div>
        <p className="font-bold text-neutral-900">Thank you! Your inquiry has been sent.</p>
        <p className="text-xs text-neutral-600 mt-1">Our sales team in Chunnakam will review your request and get in touch with you shortly.</p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-4 text-xs font-bold text-brand hover:underline cursor-pointer"
        >
          Send another inquiry →
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field id="inq-name" label="Full Name *" error={errors.name}>
        <input
          id="inq-name"
          placeholder="e.g. Ramesh Kumar"
          className="field mt-1"
          autoComplete="name"
          {...register('name')}
        />
      </Field>

      <Field id="inq-phone" label="Telephone / WhatsApp Number *" error={errors.phone}>
        <input
          id="inq-phone"
          placeholder="e.g. 077 123 4567"
          className="field mt-1"
          autoComplete="tel"
          {...register('phone')}
        />
      </Field>

      <Field id="inq-email" label="Email Address (Optional)" error={errors.email}>
        <input
          id="inq-email"
          type="email"
          placeholder="name@example.com"
          className="field mt-1"
          autoComplete="email"
          {...register('email')}
        />
      </Field>

      <Field id="inq-message" label="Your Message / Inquiry *" error={errors.message}>
        <textarea
          id="inq-message"
          rows="3"
          placeholder="Write your questions or trade-in requests here..."
          className="field mt-1 leading-relaxed"
          {...register('message')}
        />
      </Field>

      {error && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-brand">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full !py-3.5 text-sm font-bold shadow-md shadow-red-950/20 disabled:opacity-50 cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="animate-spin" size={16} /> Submitting Inquiry…
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send size={15} /> Submit Inquiry to Dealership
          </span>
        )}
      </button>
    </form>
  )
}
