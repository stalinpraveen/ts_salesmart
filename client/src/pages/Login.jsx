import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '../features/auth/AuthContext'
import { errorMessage } from '../services/api'
import { usePageTitle } from '../hooks/usePageTitle'

const loginSchema = z.object({ email: z.string().trim().email('Enter a valid email'), password: z.string().min(1, 'Enter your password') })
const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, 'Enter your name'),
  password: z.string().min(8, 'Use at least 8 characters'),
})

export default function Login() {
  usePageTitle('Login | TS SALES MART')
  const { user, login, register: signUp, logout, isStaff } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(mode === 'login' ? loginSchema : registerSchema),
  })

  if (user)
    return (
      <div className="container-page max-w-md py-16 text-center">
        <h1 className="section-title">Hello, {user.name}</h1>
        <div className="mt-6 flex flex-col gap-3">
          {isStaff && <button onClick={() => navigate('/admin')} className="btn-primary">Open staff dashboard</button>}
          <button onClick={logout} className="btn-outline-dark">Log out</button>
        </div>
      </div>
    )

  const onSubmit = async (v) => {
    setError('')
    try {
      const u = mode === 'login' ? await login(v) : await signUp(v)
      navigate(u.role === 'customer' ? '/' : '/admin')
    } catch (e) { setError(errorMessage(e)) }
  }

  return (
    <div className="container-page max-w-md py-16">
      <h1 className="section-title">{mode === 'login' ? 'Login' : 'Create Account'}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 space-y-3" key={mode}>
        {mode === 'register' && (
          <div><label htmlFor="name" className="text-xs font-semibold">Name</label>
            <input id="name" autoComplete="name" className="field mt-1" {...register('name')} />
            {errors.name && <p role="alert" className="mt-1 text-xs text-brand">{errors.name.message}</p>}</div>
        )}
        <div><label htmlFor="email" className="text-xs font-semibold">Email</label>
          <input id="email" type="email" autoComplete="email" className="field mt-1" {...register('email')} />
          {errors.email && <p role="alert" className="mt-1 text-xs text-brand">{errors.email.message}</p>}</div>
        <div><label htmlFor="password" className="text-xs font-semibold">Password</label>
          <input id="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="field mt-1" {...register('password')} />
          {errors.password && <p role="alert" className="mt-1 text-xs text-brand">{errors.password.message}</p>}</div>
        {error && <p role="alert" className="text-sm text-brand">{error}</p>}
        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-60">{isSubmitting ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create Account'}</button>
      </form>
      <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} className="mt-4 text-sm font-semibold text-brand">
        {mode === 'login' ? 'New customer? Create an account' : 'Already have an account? Login'}
      </button>
    </div>
  )
}
