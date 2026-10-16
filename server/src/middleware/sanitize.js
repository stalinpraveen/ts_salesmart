/**
 * Security Middleware: NoSQL Injection & HTTP Parameter Pollution Sanitization
 */

function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = sanitizeObject(obj[i])
    }
    return obj
  }

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.')) {
      delete obj[key]
    } else {
      obj[key] = sanitizeObject(obj[key])
    }
  }
  return obj
}

/**
 * Recursively strips keys starting with '$' or containing '.' to prevent NoSQL query operator injection.
 */
export function noSqlSanitize(req, res, next) {
  if (req.body) sanitizeObject(req.body)
  if (req.query) sanitizeObject(req.query)
  if (req.params) sanitizeObject(req.params)
  next()
}

/**
 * Prevents HTTP Parameter Pollution (HPP) by normalizing query parameters
 * that should never be arrays into single scalar values.
 */
export function preventHpp(singleValuedParams = ['page', 'limit', 'sort', 'brand', 'model', 'condition', 'type', 'category', 'status', 'year', 'minPrice', 'maxPrice', 'location']) {
  const set = new Set(singleValuedParams)
  return (req, res, next) => {
    if (req.query && typeof req.query === 'object') {
      for (const [key, value] of Object.entries(req.query)) {
        if (set.has(key) && Array.isArray(value)) {
          req.query[key] = value[0]
        }
      }
    }
    next()
  }
}
