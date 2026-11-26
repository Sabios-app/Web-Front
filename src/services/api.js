import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptador para injetar automaticamente o Token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('sabios:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptador de resposta para tratar sessão expirada
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('sabios:token')
      localStorage.removeItem('sabios:user')
      localStorage.removeItem('sabios:perfil')
    }
    return Promise.reject(error)
  }
)

export default api
