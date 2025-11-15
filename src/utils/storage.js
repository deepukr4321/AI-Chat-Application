const STORAGE_KEYS = {
  CHAT_SESSIONS: 'chat_sessions',
  ACTIVE_SESSION: 'active_session'
};

export const storage = {
  // Save chat sessions to localStorage
  saveSessions: (sessions) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHAT_SESSIONS, JSON.stringify(sessions));
    } catch (error) {
      console.error('Error saving sessions to localStorage:', error);
    }
  },

  // Load chat sessions from localStorage
  loadSessions: () => {
    try {
      const sessions = localStorage.getItem(STORAGE_KEYS.CHAT_SESSIONS);
      return sessions ? JSON.parse(sessions) : null;
    } catch (error) {
      console.error('Error loading sessions from localStorage:', error);
      return null;
    }
  },

  // Save active session ID
  saveActiveSession: (sessionId) => {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, sessionId);
    } catch (error) {
      console.error('Error saving active session to localStorage:', error);
    }
  },

  // Load active session ID
  loadActiveSession: () => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    } catch (error) {
      console.error('Error loading active session from localStorage:', error);
      return null;
    }
  }
};