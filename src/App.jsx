import React from 'react';
import { ChatProvider, useChat } from './contexts/ChatContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';

const AppContent = () => {
  const { state, actions } = useChat();

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={state.sidebarOpen}
        onClose={actions.toggleSidebar}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={actions.toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-semibold text-gray-800">AI Chat</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
};

export default App;