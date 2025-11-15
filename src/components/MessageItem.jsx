import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MessageItem = ({ message, onRetry }) => {
  const isUser = message.role === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[80%] rounded-lg p-4 ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="text-sm text-gray-500">Assistant</span>
          </div>
        )}
        
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        
        <div className={`flex justify-between items-center mt-2 text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          <span>{timestamp}</span>
          {message.error && (
            <button
              onClick={() => onRetry(message)}
              className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Retry
            </button>
          )}
        </div>
        
        {message.error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
            Error: {message.error}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;