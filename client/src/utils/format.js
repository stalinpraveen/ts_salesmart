export const formatLKR = (value) =>
  `Rs. ${new Intl.NumberFormat('en-LK', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`

export const formatLKRWords = (value) => {
  const num = Number(value) || 0
  if (num >= 10000000) {
    const millions = (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 2)
    return `Rs. ${millions} Million`
  }
  if (num >= 100000) {
    const lakhs = (num / 100000).toFixed(num % 100000 === 0 ? 0 : 1)
    return `Rs. ${lakhs} Lakhs`
  }
  return formatLKR(num)
}

export const formatKm = (value) =>
  `${new Intl.NumberFormat('en-LK').format(Number(value) || 0)} km`

export const formatNumber = (value) =>
  new Intl.NumberFormat('en-LK').format(Number(value) || 0)

