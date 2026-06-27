// Placeholder for future Supabase API integration
// Replace mock data calls in Redux async thunks with these service methods

export const authService = {
  login: async (_email: string, _password: string) => {
    throw new Error('Not implemented — use Redux auth slice for mock auth');
  },
  register: async (_data: unknown) => {
    throw new Error('Not implemented');
  },
  logout: async () => {
    throw new Error('Not implemented');
  },
  getSession: async () => null,
};

export const servicesApi = {
  getAll: async () => [],
  getById: async (_id: string) => null,
  search: async (_filters: unknown) => [],
  create: async (_data: unknown) => null,
  update: async (_id: string, _data: unknown) => null,
  delete: async (_id: string) => {},
};

export const enquiriesApi = {
  getAll: async () => [],
  submit: async (_data: unknown) => null,
  updateStatus: async (_id: string, _status: string) => null,
};

export const chatApi = {
  getConversations: async (_userId: string) => [],
  getMessages: async (_conversationId: string) => [],
  sendMessage: async (_data: unknown) => null,
  subscribeToMessages: (_conversationId: string, _callback: (msg: unknown) => void) => {
    return () => {};
  },
};

export const uploadService = {
  uploadImage: async (_file: File) => '',
  uploadDocument: async (_file: File) => '',
};

export const notificationService = {
  getAll: async (_userId: string) => [],
  markAsRead: async (_id: string) => {},
  subscribe: (_userId: string, _callback: (notif: unknown) => void) => {
    return () => {};
  },
};
