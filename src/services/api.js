import axios from 'axios'

export const TOKEN_KEY = 'kc_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) localStorage.removeItem(TOKEN_KEY)
    return Promise.reject(error)
  }
)

const FRIENDLY = {
  400: 'The request could not be processed. Please check your details and try again.',
  401: 'Your session has expired. Please log in again.',
  403: 'You do not have permission to do that.',
  404: 'We could not find what you were looking for.',
  422: 'Please fix the highlighted fields and try again.',
  500: 'Something went wrong on our side. Please try again later.',
}

export function messageOf(error) {
  if (!error?.response) return 'Unable to reach the server. Please check your connection and try again.'
  const { status, data } = error.response
  if (status === 422 && data?.errors) {
    const first = Object.values(data.errors).find(Boolean)
    if (Array.isArray(first) && first.length) return first[0]
  }
  return data?.message || FRIENDLY[status] || 'Something went wrong. Please try again.'
}

export function errorsOf(error) {
  const errors = error?.response?.data?.errors
  if (!errors) return {}
  return Object.fromEntries(Object.entries(errors).map(([field, value]) => [field, Array.isArray(value) ? value[0] : value]))
}

export const listOf = response => (Array.isArray(response.data) ? response.data : response.data?.data ?? [])

export const recordOf = response => response.data?.user ?? response.data?.data ?? response.data

export default api
