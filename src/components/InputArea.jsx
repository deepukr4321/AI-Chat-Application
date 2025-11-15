// import React, { useState, useRef } from 'react';

// const InputArea = ({ onSendMessage, isLoading, apiKey }) => {
//   const [message, setMessage] = useState('');
//   const textareaRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !isLoading) {
//       onSendMessage(message.trim());
//       setMessage('');
//       if (textareaRef.current) {
//         textareaRef.current.style.height = 'auto';
//       }
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   const handleChange = (e) => {
//     setMessage(e.target.value);
    
//     // Auto-resize textarea
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
//     }
//   };

//   if (!apiKey) {
//     return (
//       <div className="border-t border-gray-200 p-4">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
//           <p className="text-yellow-800">
//             Please set your Gemini API key in the settings to start chatting.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="border-t border-gray-200 p-4">
//       <form onSubmit={handleSubmit} className="flex space-x-4">
//         <div className="flex-1 relative">
//           <textarea
//             ref={textareaRef}
//             value={message}
//             onChange={handleChange}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
//             disabled={isLoading}
//             className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
//             rows="1"
//             style={{ minHeight: '48px', maxHeight: '120px' }}
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={!message.trim() || isLoading}
//           className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {isLoading ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//           ) : (
//             'Send'
//           )}
//         </button>
//       </form>
//       <div className="mt-2 text-xs text-gray-500 text-center">
//         Press Enter to send, Shift+Enter for new line
//       </div>
//     </div>
//   );
// };

// export default InputArea;





import React, { useState, useRef } from 'react';

const InputArea = ({ onSendMessage, isLoading, apiKey }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     if (e.shiftKey) {
  //       // Shift+Enter - allow new line, do nothing
  //       return;
  //     } else {
  //       // Enter alone - submit and prevent default
  //       e.preventDefault();
  //       handleSubmit();
  //     }
  //   }
  // };


  const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit();
    return false;
  }
};

  const handleChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  };

  if (!apiKey) {
    return (
      <div className="border-t border-gray-200 p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <p className="text-yellow-800">
            Please set your Gemini API key in the settings to start chatting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
            disabled={isLoading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            rows="1"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={!message.trim() || isLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Send'
          )}
        </button>
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center">
        Press Enter to send, Shift+Enter for new line
      </div>
    </div>
  );
};

export default InputArea;