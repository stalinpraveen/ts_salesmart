import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 20000,
})

const readCookie = (name) =>
  document.cookie.split('; ').find((c) => c.startsWith(`${name}=`))?.split('=')[1]

// Echo the CSRF cookie in a header on state-changing requests (double-submit pattern).
api.interceptors.request.use((config) => {
  if (!['get', 'head', 'options'].includes((config.method || 'get').toLowerCase())) {
    const csrf = readCookie('csrf')
    if (csrf) config.headers['x-csrf-token'] = csrf
  }
  return config
})

export const errorMessage = (e, fallback = 'Something went wrong. Please try again.') =>
  e.response?.data?.message || fallback
