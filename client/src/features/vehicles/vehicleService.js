import { api } from '../../services/api'

export const fetchVehicles = (params = {}) => api.get('/vehicles', { params }).then((r) => r.data)
export const fetchVehicle = (id) => api.get(`/vehicles/${id}`).then((r) => r.data)
export const sendInquiry = (payload) => api.post('/inquiries', payload).then((r) => r.data)
