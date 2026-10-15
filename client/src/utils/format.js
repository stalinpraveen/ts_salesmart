export const formatLKR = (value) =>
  `Rs. ${new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`

export const formatKm = (value) =>
  `${new Intl.NumberFormat('en-LK').format(Number(value) || 0)} km`
