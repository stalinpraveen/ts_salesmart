/**
 * Calculate whether the TS SALES MART showroom in Chunnakam is currently open
 * based on Sri Lanka Standard Time (UTC+5:30).
 */
export function getShowroomStatus() {
  try {
    const now = new Date()
    // Convert to Sri Lanka time (UTC+5:30)
    const slString = now.toLocaleString('en-US', { timeZone: 'Asia/Colombo' })
    const slDate = new Date(slString)
    const day = slDate.getDay() // 0 = Sunday, 1 = Monday, ... 6 = Saturday
    const hours = slDate.getHours()
    const minutes = slDate.getMinutes()
    const currentMins = hours * 60 + minutes

    // Mon - Sat: 8:30 AM (510 mins) to 6:30 PM (1110 mins)
    const openMins = 8 * 60 + 30
    const closeMins = 18 * 60 + 30

    if (day === 0) {
      return {
        isOpen: false,
        badgeText: 'Sunday by Appointment',
        statusClass: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        detail: 'Showroom open by advance appointment today',
      }
    }

    if (currentMins >= openMins && currentMins < closeMins) {
      return {
        isOpen: true,
        badgeText: 'Showroom Open Now',
        statusClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        detail: 'Closes at 6:30 PM today',
      }
    }

    return {
      isOpen: false,
      badgeText: 'Showroom Closed',
      statusClass: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
      detail: currentMins < openMins ? 'Opens at 8:30 AM today' : 'Opens tomorrow at 8:30 AM',
    }
  } catch {
    return {
      isOpen: true,
      badgeText: 'Showroom Available',
      statusClass: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      detail: 'Mon - Sat: 8:30 AM - 6:30 PM',
    }
  }
}
