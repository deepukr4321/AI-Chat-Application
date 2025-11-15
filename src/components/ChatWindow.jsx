import React from 'react';
import { useChat } from '../contexts/ChatContext.jsx';
import MessageList from './MessageList.jsx';
import InputArea from './InputArea.jsx';
import { useApi } from '../hooks/useApi.jsx';

const ChatWindow = () => {
  const { state, actions } = useChat();
  const { sendMessage, loading, error, setError } = useApi();

  const activeSession = state.sessions.find(session => session.id === state.activeSession);

  const handleSendMessage = async (content) => {
    if (!activeSession || !content.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date().toISOString()
    };

    actions.addMessage(userMessage);

    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
      isLoading: true
    };

    actions.addMessage(aiMessage);

    try {
      const response = await sendMessage(content, state.apiKey);
      
      actions.updateMessage(aiMessage.id, {
        content: response,
        isLoading: false
      });
    } catch (err) {
      actions.updateMessage(aiMessage.id, {
        content: 'Failed to get response from AI.',
        error: err.message,
        isLoading: false
      });
    }
  };

  const handleRetry = async (message) => {
    if (message.role === 'user') {
      // Retry the user message by sending it again
      await handleSendMessage(message.content);
    } else {
      // For AI messages, we need to find the previous user message and retry
      const messages = activeSession.messages;
      const messageIndex = messages.findIndex(m => m.id === message.id);
      
      if (messageIndex > 0) {
        const previousUserMessage = messages[messageIndex - 1];
        if (previousUserMessage.role === 'user') {
          await handleSendMessage(previousUserMessage.content);
        }
      }
    }
  };

  if (!activeSession) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Chat</h3>
          <p className="text-gray-500">Select a chat or create a new one to start messaging.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">{activeSession.title}</h2>
          <div className="text-sm text-gray-500">
            {activeSession.messages.filter(m => m.role === 'user').length} messages
          </div>
        </div>
      </div>

      {/* Messages */}
      <MessageList
        messages={activeSession.messages}
        isLoading={loading}
        onRetry={handleRetry}
      />

      {/* Input Area */}
      <InputArea
        onSendMessage={handleSendMessage}
        isLoading={loading}
        apiKey={state.apiKey}
      />
    </div>
  );
};

export default ChatWindow;