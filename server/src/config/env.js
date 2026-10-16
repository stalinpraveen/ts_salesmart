import 'dotenv/config'

const required = (name) => {
  const v = process.env[name]
  if (!v) throw new Error(`Missing required environment variable: ${name}`)
  return v
}

const getJwtSecret = () => {
  const secret = required('JWT_SECRET')
  if (secret.length < 32 && process.env.NODE_ENV === 'production') {
    throw new Error('SECURITY WARNING: JWT_SECRET must be at least 32 characters in production!')
  }
  return secret
}

const getClientOrigins = () => {
  const raw = process.env.CLIENT_URL || 'http://localhost:5173'
  return raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  allowedOrigins: getClientOrigins(),
  mongoUri: () => required('MONGODB_URI'),
  jwtSecret: getJwtSecret,
}
