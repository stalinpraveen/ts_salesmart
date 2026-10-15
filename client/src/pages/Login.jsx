import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  Shield,
  Heart,
  Car,
  LogOut,
} from 'lucide-react'
import { useAuth } from '../features/auth/AuthContext'
import { errorMessage } from '../services/api'
import { usePageTitle } from '../hooks/usePageTitle'
import { ASSETS } from '../utils/constants'

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Enter your password'),
})

const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export default function Login() {
  usePageTitle('Customer & Staff Portal | TS SALES MART')
  const { user, login, register: signUp, logout, isStaff, isAdmin } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  })

  // Logged In Dashboard Card
  if (user) {
    const initials = user.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2)
      : 'U'

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#fcfcfd] py-16 px-4">
        <div className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl shadow-black/5 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-neutral-900 text-white font-display text-2xl font-bold border-4 border-red-50 shadow-lg">
            {initials}
          </div>

          <div className="mt-4">
            <h1 className="font-display text-2xl font-extrabold uppercase text-neutral-900">
              Welcome, {user.name}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">{user.email}</p>
            <div className="mt-2.5">
              <span
                className={`badge px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  isAdmin
                    ? 'bg-red-50 text-brand border border-red-200'
                    : isStaff
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-neutral-100 text-neutral-700'
                }`}
              >
                {user.role}
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            {isStaff && (
              <button
                onClick={() => navigate('/admin')}
                className="btn-primary w-full !py-3.5 text-sm font-bold shadow-lg shadow-red-950/20"
              >
                <Shield size={16} /> Open Staff Management Dashboard
              </button>
            )}

            <Link
              to="/favorites"
              className="btn-outline-dark w-full !py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Heart size={16} className="text-brand" /> My Saved Vehicles
            </Link>

            <Link
              to="/vehicles"
              className="btn-outline-dark w-full !py-3 text-sm font-semibold flex items-center justify-center gap-2"
            >
              <Car size={16} /> Browse Current Inventory
            </Link>

            <div className="pt-3 border-t border-neutral-100">
              <button
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-brand transition cursor-pointer"
              >
                <LogOut size={14} /> Log out from this device
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onSubmit = async (v) => {
    setError('')
    try {
      const u = mode === 'login' ? await login(v) : await signUp(v)
      navigate(u.role === 'customer' ? '/' : '/admin')
    } catch (e) {
      setError(errorMessage(e))
    }
  }

  const fillStaffDemo = () => {
    setMode('login')
    setValue('email', 'admin@tssalesmart.lk')
    setValue('password', 'Admin@123456')
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center bg-[#09090b] py-16 px-4 overflow-hidden">
      {/* Background Ambient Lighting */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-brand/20 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-red-900/15 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Portal Card */}
        <div className="rounded-3xl border border-white/10 bg-neutral-900/90 backdrop-blur-2xl p-7 sm:p-9 shadow-2xl text-white">
          {/* Logo & Header */}
          <div className="text-center space-y-2 mb-8">
            <Link to="/" className="inline-block transition hover:opacity-90">
              <img
                src={ASSETS.logo}
                alt="TS SALES MART"
                className="h-14 sm:h-16 w-auto mx-auto object-contain drop-shadow"
              />
            </Link>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white mt-3">
              {mode === 'login' ? 'Portal Sign In' : 'Create Account'}
            </h1>
            <p className="text-xs text-neutral-400">
              {mode === 'login'
                ? 'Sign in to sync saved vehicles or manage dealership stock'
                : 'Register your account to save favourite cars & vans'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-black/60 p-1 border border-white/10 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login')
                setError('')
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                mode === 'login'
                  ? 'bg-brand text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register')
                setError('')
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer ${
                mode === 'register'
                  ? 'bg-brand text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              New Customer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" key={mode}>
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Full Name
                </label>
                <div className="relative mt-1 flex items-center">
                  <UserIcon className="absolute left-3.5 text-neutral-400" size={17} />
                  <input
                    id="name"
                    autoComplete="name"
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand focus:outline-none transition"
                    {...register('name')}
                  />
                </div>
                {errors.name && <p role="alert" className="mt-1 text-xs text-brand font-semibold">{errors.name.message}</p>}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                Email Address
              </label>
              <div className="relative mt-1 flex items-center">
                <Mail className="absolute left-3.5 text-neutral-400" size={17} />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand focus:outline-none transition"
                  {...register('email')}
                />
              </div>
              {errors.email && <p role="alert" className="mt-1 text-xs text-brand font-semibold">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
                Password
              </label>
              <div className="relative mt-1 flex items-center">
                <Lock className="absolute left-3.5 text-neutral-400" size={17} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-10 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand focus:outline-none transition"
                  {...register('password')}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-neutral-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p role="alert" className="mt-1 text-xs text-brand font-semibold">{errors.password.message}</p>}
            </div>

            {error && (
              <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full !py-3.5 text-sm font-bold shadow-xl shadow-red-950/40 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Authenticating…' : mode === 'login' ? 'Sign In to Portal' : 'Create Customer Account'}
            </button>
          </form>

          {/* Quick Staff Demo Sign-in Hint */}
          <div className="mt-6 border-t border-white/10 pt-5 text-center">
            <button
              type="button"
              onClick={fillStaffDemo}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-brand transition cursor-pointer"
            >
              <Shield size={13} className="text-brand" />
              <span>Staff Login: <strong>admin@tssalesmart.lk</strong></span>
            </button>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-neutral-400 hover:text-white transition inline-flex items-center gap-1">
            ← Return to TS SALES MART Showroom
          </Link>
        </div>
      </div>
    </div>
  )
}
