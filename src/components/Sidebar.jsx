import React, { useState } from 'react';
import { useChat } from '../contexts/ChatContext.jsx';
import { exportChatAsJSON } from '../utils/export.js';

const Sidebar = ({ isOpen, onClose }) => {
  const { state, actions } = useChat();
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleCreateNewChat = () => {
    actions.createSession();
  };

  const handleSessionClick = (sessionId) => {
    actions.setActiveSession(sessionId);
  };

  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      actions.deleteSession(sessionId);
    }
  };

  const startEditing = (session, e) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };

  const saveEdit = (sessionId) => {
    if (editTitle.trim()) {
      actions.updateSession(sessionId, { title: editTitle.trim() });
    }
    setEditingSessionId(null);
    setEditTitle('');
  };

  const cancelEdit = () => {
    setEditingSessionId(null);
    setEditTitle('');
  };

  const handleExport = (session, e) => {
    e.stopPropagation();
    exportChatAsJSON(session);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-80 bg-white border-r border-gray-200 transform transition-transform lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Chat Sessions</h2>
              <button
                onClick={handleCreateNewChat}
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                New Chat
              </button>
            </div>
          </div>

          {/* Sessions List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {state.sessions.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No chat sessions yet. Start a new chat!
              </div>
            ) : (
              <div className="p-2">
                {state.sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors ${
                      state.activeSession === session.id
                        ? 'bg-blue-50 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSessionClick(session.id)}
                  >
                    {editingSessionId === session.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onBlur={() => saveEdit(session.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') saveEdit(session.id);
                            if (e.key === 'Escape') cancelEdit();
                          }}
                          className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => saveEdit(session.id)}
                          className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          ✓
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          ✗
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 truncate">
                            {session.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {session.messages.length} messages •{' '}
                            {new Date(session.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => startEditing(session, e)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Rename"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={(e) => handleExport(session, e)}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Export"
                          >
                            📥
                          </button>
                          <button
                            onClick={(e) => handleDeleteSession(session.id, e)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="p-4 border-t border-gray-200">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={state.apiKey}
                  onChange={(e) => actions.setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Get your free API key from{' '}
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;