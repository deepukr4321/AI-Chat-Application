import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { storage } from '../utils/storage.js';

const ChatContext = createContext();

// Initial state
const initialState = {
  sessions: [],
  activeSession: null,
  apiKey: '',
  sidebarOpen: false
};

// Action types
const ACTION_TYPES = {
  LOAD_SESSIONS: 'LOAD_SESSIONS',
  CREATE_SESSION: 'CREATE_SESSION',
  UPDATE_SESSION: 'UPDATE_SESSION',
  DELETE_SESSION: 'DELETE_SESSION',
  SET_ACTIVE_SESSION: 'SET_ACTIVE_SESSION',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  SET_API_KEY: 'SET_API_KEY',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR'
};

// Reducer function
const chatReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOAD_SESSIONS:
      return {
        ...state,
        sessions: action.payload.sessions,
        activeSession: action.payload.activeSession
      };

    case ACTION_TYPES.CREATE_SESSION:
      const newSession = {
        id: Date.now().toString(),
        title: action.payload.title || `New Chat ${state.sessions.length + 1}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: []
      };
      
      const updatedSessions = [newSession, ...state.sessions];
      storage.saveSessions(updatedSessions);
      storage.saveActiveSession(newSession.id);
      
      return {
        ...state,
        sessions: updatedSessions,
        activeSession: newSession.id,
        sidebarOpen: false
      };

    case ACTION_TYPES.UPDATE_SESSION:
      const updatedSessionSessions = state.sessions.map(session =>
        session.id === action.payload.id
          ? { ...session, ...action.payload.updates, updatedAt: new Date().toISOString() }
          : session
      );
      storage.saveSessions(updatedSessionSessions);
      return {
        ...state,
        sessions: updatedSessionSessions
      };

    case ACTION_TYPES.DELETE_SESSION:
      const filteredSessions = state.sessions.filter(session => session.id !== action.payload);
      let newActiveSession = state.activeSession;
      
      if (state.activeSession === action.payload) {
        newActiveSession = filteredSessions[0]?.id || null;
        storage.saveActiveSession(newActiveSession);
      }
      
      storage.saveSessions(filteredSessions);
      return {
        ...state,
        sessions: filteredSessions,
        activeSession: newActiveSession
      };

    case ACTION_TYPES.SET_ACTIVE_SESSION:
      storage.saveActiveSession(action.payload);
      return {
        ...state,
        activeSession: action.payload,
        sidebarOpen: false
      };

    case ACTION_TYPES.ADD_MESSAGE:
      const sessionToUpdate = state.sessions.find(session => session.id === state.activeSession);
      if (!sessionToUpdate) return state;

      const updatedMessages = [...sessionToUpdate.messages, action.payload];
      
      // Update session title if it's the first user message
      let titleUpdate = {};
      if (action.payload.role === 'user' && sessionToUpdate.messages.length === 0) {
        titleUpdate = { title: action.payload.content.substring(0, 30) + '...' };
      }

      const sessionsWithNewMessage = state.sessions.map(session =>
        session.id === state.activeSession
          ? {
              ...session,
              ...titleUpdate,
              messages: updatedMessages,
              updatedAt: new Date().toISOString()
            }
          : session
      );

      storage.saveSessions(sessionsWithNewMessage);
      return {
        ...state,
        sessions: sessionsWithNewMessage
      };

    case ACTION_TYPES.UPDATE_MESSAGE:
      const sessionsWithUpdatedMessage = state.sessions.map(session =>
        session.id === state.activeSession
          ? {
              ...session,
              messages: session.messages.map(message =>
                message.id === action.payload.id
                  ? { ...message, ...action.payload.updates }
                  : message
              ),
              updatedAt: new Date().toISOString()
            }
          : session
      );

      storage.saveSessions(sessionsWithUpdatedMessage);
      return {
        ...state,
        sessions: sessionsWithUpdatedMessage
      };

    case ACTION_TYPES.SET_API_KEY:
      return {
        ...state,
        apiKey: action.payload
      };

    case ACTION_TYPES.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };

    default:
      return state;
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load sessions from localStorage on mount
  useEffect(() => {
    const sessions = storage.loadSessions();
    const activeSession = storage.loadActiveSession();
    
    dispatch({
      type: ACTION_TYPES.LOAD_SESSIONS,
      payload: {
        sessions: sessions || [],
        activeSession: activeSession || (sessions?.[0]?.id || null)
      }
    });
  }, []);

  const actions = {
    createSession: (title) => dispatch({ type: ACTION_TYPES.CREATE_SESSION, payload: { title } }),
    updateSession: (id, updates) => dispatch({ type: ACTION_TYPES.UPDATE_SESSION, payload: { id, updates } }),
    deleteSession: (id) => dispatch({ type: ACTION_TYPES.DELETE_SESSION, payload: id }),
    setActiveSession: (id) => dispatch({ type: ACTION_TYPES.SET_ACTIVE_SESSION, payload: id }),
    addMessage: (message) => dispatch({ type: ACTION_TYPES.ADD_MESSAGE, payload: message }),
    updateMessage: (id, updates) => dispatch({ type: ACTION_TYPES.UPDATE_MESSAGE, payload: { id, updates } }),
    setApiKey: (apiKey) => dispatch({ type: ACTION_TYPES.SET_API_KEY, payload: apiKey }),
    toggleSidebar: () => dispatch({ type: ACTION_TYPES.TOGGLE_SIDEBAR })
  };

  return (
    <ChatContext.Provider value={{ state, actions }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};