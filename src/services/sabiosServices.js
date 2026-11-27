import api from "./api";

export const authService = {
  async login(email, password) {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },

  async register({ name, email, password, role, phone }) {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
      role: role.toUpperCase(),
      phone,
    });
    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  async resetPassword(token, newPassword) {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  },

  async getMe() {
    const response = await api.get("/users/me");
    return response.data;
  },
};

export const specialistService = {
  async listSpecialists({ specialty, search, page = 0, size = 20 } = {}) {
    const params = { page, size };
    if (specialty) params.specialty = specialty;
    if (search) params.search = search;
    const response = await api.get("/specialists", { params });
    return response.data;
  },

  async getById(id) {
    const response = await api.get(`/specialists/${id}`);
    return response.data;
  },

  async createProfile(data) {
    const response = await api.post("/specialists/me", data);
    return response.data;
  },
};

export const mentoringService = {
  async requestMentoring({
    specialistId,
    title,
    description,
    doubts,
    scheduledAt,
  }) {
    const response = await api.post("/mentorings", {
      specialistId,
      title,
      description,
      doubts,
      scheduledAt,
    });
    return response.data;
  },

  /**
   * Lista mentorias com filtros opcionais.
   * @param {{ scope?: 'HISTORY'|'UPCOMING', status?: string, page?: number, size?: number }} opts
   */
  async listMyMentorings({ scope, status, page = 0, size = 20 } = {}) {
    const params = { page, size };
    if (scope) params.scope = scope;
    if (status) params.status = status;
    const response = await api.get("/mentorings", { params });
    return response.data;
  },

  async getNextMentoring() {
    const response = await api.get("/mentorings/next");
    return response.data;
  },

  async accept(id) {
    const response = await api.patch(`/mentorings/${id}/accept`);
    return response.data;
  },

  async reject(id) {
    const response = await api.patch(`/mentorings/${id}/reject`);
    return response.data;
  },
};

export const actionPlanService = {
  /**
   * Lista planos de ação.
   * @param {{ completed?: boolean, overdue?: boolean, mentoringId?: string|number }} filters
   */
  async list(filters = {}) {
    const params = { ...filters };
    const response = await api.get("/action-plans", { params });
    return response.data;
  },

  /**
   * Cria plano de ação.
   * @param {{ title: string, dueDate?: string, conselheiroNome?: string, mentoringId?: string|number }} payload
   */
  async create({ title, dueDate, conselheiroNome, mentoringId }) {
    const payload = { title };
    if (conselheiroNome) payload.conselheiroNome = conselheiroNome;
    if (dueDate) payload.dueDate = dueDate;
    if (mentoringId) payload.mentoringId = mentoringId;
    // backward compat — legacy deadline field
    if (!dueDate) payload.deadline = new Date().toISOString();
    const response = await api.post("/action-plans", payload);
    return response.data;
  },

  /**
   * Conselheiro atribui tarefa a uma mentoria.
   * @param {string|number} mentoringId
   * @param {{ title: string, dueDate?: string }} data
   */
  async assignToMentoring(mentoringId, { title, dueDate }) {
    const payload = { title };
    if (dueDate) payload.dueDate = dueDate;
    const response = await api.post(
      `/action-plans/mentorings/${mentoringId}`,
      payload,
    );
    return response.data;
  },

  /**
   * Lista tarefas de uma mentoria específica.
   */
  async listByMentoring(mentoringId) {
    const response = await api.get(`/action-plans/mentorings/${mentoringId}`);
    return response.data;
  },

  /**
   * Edita título e/ou prazo de uma tarefa (somente quem criou).
   */
  async update(id, data) {
    const response = await api.patch(`/action-plans/${id}`, data);
    return response.data;
  },

  /**
   * Remove uma tarefa (somente quem criou — 403 se for do conselheiro).
   */
  async delete(id) {
    const response = await api.delete(`/action-plans/${id}`);
    return response.data;
  },

  async toggle(id) {
    const response = await api.patch(`/action-plans/${id}/toggle`);
    return response.data;
  },
};

export const reviewService = {
  /**
   * Mentorias concluídas ainda sem avaliação.
   */
  async getPending() {
    const response = await api.get("/reviews/pending");
    return response.data;
  },

  /**
   * Avaliações feitas pelo usuário autenticado.
   */
  async getMy() {
    const response = await api.get("/reviews/me");
    return response.data;
  },

  /**
   * Cria uma avaliação.
   * @param {{ mentoringId: string|number, rating: number, comment?: string }} data
   */
  async create({ mentoringId, rating, comment }) {
    const payload = { mentoringId, rating };
    if (comment) payload.comment = comment;
    const response = await api.post("/reviews", payload);
    return response.data;
  },

  /**
   * Edita nota e/ou comentário de uma avaliação existente.
   */
  async update(id, { rating, comment }) {
    const payload = {};
    if (rating !== undefined) payload.rating = rating;
    if (comment !== undefined) payload.comment = comment;
    const response = await api.patch(`/reviews/${id}`, payload);
    return response.data;
  },

  async delete(id) {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

export const notificationService = {
  /**
   * @param {{ unreadOnly?: boolean, page?: number, size?: number }} opts
   */
  async list({ unreadOnly, page = 0, size = 20 } = {}) {
    const params = { page, size };
    if (unreadOnly !== undefined) params.unreadOnly = unreadOnly;
    const response = await api.get("/notifications", { params });
    return response.data;
  },

  async getUnreadCount() {
    const response = await api.get("/notifications/unread-count");
    return response.data;
  },

  async markRead(id) {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllRead() {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  },
};

export const messageService = {
  async listConversations() {
    const response = await api.get("/messages/conversations");
    return response.data;
  },

  async getConversation(id) {
    const response = await api.get(`/messages/conversations/${id}`);
    return response.data;
  },

  /**
   * @param {{ specialistId: string|number, content: string }} data
   */
  async send({ specialistId, content }) {
    const response = await api.post("/messages", { specialistId, content });
    return response.data;
  },
};
