const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const SORTS = {
  newest: { createdAt: -1 },
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  year_desc: { year: -1 },
}

// Builds the public Mongo filter. Public users only ever see 'available' vehicles.
export function buildPublicFilter(q) {
  const f = { status: 'available' }
  for (const k of ['type', 'category', 'year', 'fuelType', 'condition', 'featured']) {
    if (q[k] !== undefined) f[k] = q[k]
  }
  for (const k of ['brand', 'model', 'location']) {
    if (q[k]) f[k] = new RegExp(`^${escapeRegex(q[k])}$`, 'i')
  }
  if (q.minPrice !== undefined || q.maxPrice !== undefined) {
    f.price = {}
    if (q.minPrice !== undefined) f.price.$gte = q.minPrice
    if (q.maxPrice !== undefined) f.price.$lte = q.maxPrice
  }
  if (q.q) {
    const r = new RegExp(escapeRegex(q.q), 'i')
    f.$or = [{ title: r }, { brand: r }, { model: r }]
  }
  return f
}

export const buildSort = (sort) => SORTS[sort] || SORTS.newest
