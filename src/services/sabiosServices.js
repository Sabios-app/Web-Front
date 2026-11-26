import api from './api'

export const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  async register({ name, email, password, role, phone }) {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
      role: role.toUpperCase(), // CLIENT ou COUNSELOR
      phone,
    })
    return response.data
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email })
    return response.data
  },

  async getMe() {
    const response = await api.get('/users/me')
    return response.data
  },
}

export const specialistService = {
  async listSpecialists({ specialty, search, page = 0, size = 20 } = {}) {
    const params = { page, size }
    if (specialty) params.specialty = specialty
    if (search) params.search = search
    const response = await api.get('/specialists', { params })
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/specialists/${id}`)
    return response.data
  },

  async createProfile(data) {
    const response = await api.post('/specialists/me', data)
    return response.data
  },
}

export const mentoringService = {
  async requestMentoring({ specialistId, title, description, doubts, scheduledAt }) {
    const response = await api.post('/mentorings', {
      specialistId,
      title,
      description,
      doubts,
      scheduledAt,
    })
    return response.data
  },

  async listMyMentorings() {
    const response = await api.get('/mentorings')
    return response.data
  },

  async getNextMentoring() {
    const response = await api.get('/mentorings/next')
    return response.data
  },

  async accept(id) {
    const response = await api.patch(`/mentorings/${id}/accept`)
    return response.data
  },

  async reject(id) {
    const response = await api.patch(`/mentorings/${id}/reject`)
    return response.data
  },
}

export const actionPlanService = {
  async list() {
    const response = await api.get('/action-plans')
    return response.data
  },

  async create({ title, deadline, conselheiroNome }) {
    const response = await api.post('/action-plans', { title, deadline, conselheiroNome })
    return response.data
  },

  async toggle(id) {
    const response = await api.patch(`/action-plans/${id}/toggle`)
    return response.data
  },
}
