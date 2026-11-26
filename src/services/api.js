import axios from 'axios'
import { CHAVES_AUTH } from '../utils/authStorage.js'
import { criarTratadorErroResposta } from './apiInterceptor.js'

const API_BASE_URL =
  import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptador para injetar automaticamente o Token JWT
api.interceptors.request.use((config) => {
  try {
    const token = globalThis.localStorage?.getItem(CHAVES_AUTH.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch {
    // Ignora caso localStorage esteja indisponível
  }
  return config
})

// Interceptador de resposta para tratar sessão expirada (401 fora do login)
api.interceptors.response.use((response) => response, criarTratadorErroResposta())

export default api
