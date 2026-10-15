import { ApiError } from '../utils/ApiError.js'

export const notFound = (req, res, next) => next(new ApiError(404, 'Route not found'))

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  if (status >= 500) console.error(err)
  res.status(status).json({
    success: false,
    message: status >= 500 ? 'Something went wrong. Please try again later.' : err.message,
    ...(err.details ? { errors: err.details } : {}),
  })
}
