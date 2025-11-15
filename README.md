Gemini Chatbot 🤖
A modern, responsive chat application built with React that integrates with Google's Gemini AI for intelligent conversations. Features a clean UI, multiple chat sessions, and real-time messaging.


 ✨Features
💬 AI-Powered Chat: Integrates with Google Gemini AI for intelligent responses
📱 Responsive Design: Works seamlessly on desktop and mobile devices
💾 Multiple Chat Sessions: Create, manage, and switch between different conversations
🎨 Markdown Support: AI responses rendered with beautiful markdown formatting
💾 Local Storage: Automatically saves your chats and sessions
📤 Export Chats: Download chat conversations as JSON files
⚡ Real-time Typing Indicators: Visual feedback when AI is responding
🔐 Secure API Key Management: Safe storage of your Gemini API key

🚀 Quick Start
Prerequisites
Node.js (version 14 or higher)
npm or yarn
Google Gemini API key


Installation
1.Clone the repository
git clone <your-repo-url>
cd Gemini-chatbot
2.Install dependencies
npm install

3.Get your Gemini API Key
Visit Google AI Studio
Sign in with your Google account
Click "Create API Key"
Copy your API key

4.Start the development server
-  npm run dev

5.Configure API Key
Open the chat application in your browser
Click the sidebar menu
Paste your Gemini API key in the settings section
Start chatting!


6. 🛠️ Technology Stack
Frontend: React 18, Vite
Styling: Tailwind CSS
AI Integration: Google Gemini API
State Management: React Context API + useReducer
Storage: Browser LocalStorage
Markdown: ReactMarkdown + remarkGfm

📁 Project Structure
src/
├── components/
│   ├── ChatWindow.jsx     # Main chat interface
│   ├── MessageList.jsx    # Messages container
│   ├── MessageItem.jsx    # Individual message component
│   ├── InputArea.jsx      # Message input with auto-resize
│   ├── Sidebar.jsx        # Chat sessions sidebar
│   └── TypingIndicator.jsx# Loading animation
├── contexts/
│   └── ChatContext.jsx    # Global state management
├── hooks/
│   ├── useApi.jsx         # Gemini API integration
│   └── useLocalStorage.jsx# Local storage utilities
├── utils/
│   ├── storage.js         # Storage management
│   └── export.js          # Chat export functionality
└── App.jsx                # Main application component

🔧 Configuration

API Key Setup
The application requires a Google Gemini API key to function:
*Obtain your free API key from Google AI Studio
*Enter the key in the sidebar settings
*The key is stored locally in your browser

Available Models
The app automatically uses the best available Gemini models:
gemini-2.0-flash (Primary)
gemini-2.5-flash (Fallback)
gemini-pro-latest (Backup)

💡 Usage
Starting a New Chat
Click "New Chat" in the sidebar
Start typing your message
Press Enter to send (Shift+Enter for new line)


Managing Chats
Rename: Click the edit icon (✏️) on any chat session
Export: Click the download icon (📥) to save chat as JSON
Delete: Click the trash icon (🗑️) to remove a chat
Switch: Click on any chat session to switch between conversations


Message Features
Markdown Support: AI responses support code blocks, lists, and formatting
Error Handling: Retry failed messages with the "Retry" button
Auto-scroll: Chat automatically scrolls to the latest message
Typing Indicators: Visual feedback when AI is generating response


🔒 Privacy & Security
API keys are stored locally in your browser
No chat data is sent to external servers except Google Gemini API
All conversations remain on your device
Export functionality allows you to backup your data


🐛 Troubleshooting
Common Issues
1."Failed to get response from AI"
    Check your API key is correctly set
    Verify internet connection
    Ensure the API key has Gemini API access
2.Chat sessions not saving
    Check browser localStorage is enabled
    Clear browser cache and try again
3.API rate limits
    Gemini API has usage limits
    Wait a moment and try again if you hit limits


🌟 Future Enhancements
Voice input support
Image generation integration
Chat sharing functionality
Theme customization
Advanced model settings
Conversation search
Multi-language support