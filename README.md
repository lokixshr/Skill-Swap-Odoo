# SkillSwap - Skill Exchange Platform

A modern web application for skill sharing and learning, built with React, TypeScript, and Firebase.

## Features

### Core Features
- **Browse Skills**: Discover and explore skills offered by other users
- **My Swaps**: Manage your skill exchange requests and offers
- **Dashboard**: Overview of your activity and statistics
- **Profile Management**: Complete user profile with skills and expertise
- **Messages**: Chat with other users and AI assistant

### New Messages Feature
- **Conversation List**: View all your conversations in one place
- **Real-time Chat**: Instant messaging with other users
- **AI Assistant Bot**: Automated responses to help users
- **Message History**: Persistent chat history stored in Firebase

### Bot Features
- **Auto-replies**: The bot automatically responds to user messages
- **Random Responses**: Varied and engaging bot responses
- **Delayed Responses**: Realistic 1-3 second delay for bot messages
- **Welcome Message**: Initial greeting when starting a new conversation

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication and Firestore
   - Add your Firebase config to `src/lib/firebase.ts`

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open http://localhost:5173 in your browser
   - Sign up or sign in to start using the platform

## Navigation

- **Browse Skills**: `/browse` - Discover skills and users
- **My Swaps**: `/swaps` - Manage your skill exchanges
- **Dashboard**: `/dashboard` - Overview and statistics
- **Messages**: `/messages` - Chat with users and AI assistant
- **Profile**: `/profile` - Manage your profile and skills

## Messages System

### How to Use Messages
1. Click on "Messages" in the sidebar
2. View your existing conversations or start a new one
3. Click "Start Chat with AI Assistant" to begin chatting with the bot
4. Send messages and receive automatic responses

### Bot Responses
The AI assistant provides helpful and engaging responses including:
- "That's interesting! Tell me more about that."
- "I'd love to help you with that!"
- "Great question! Let me think about that."
- And many more varied responses

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Authentication, Firestore)
- **State Management**: React Query
- **Routing**: React Router v6

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/            # shadcn/ui components
│   └── ...            # Custom components
├── pages/             # Page components
│   ├── Messages.tsx   # Messages and chat functionality
│   ├── Profile.tsx    # User profile management
│   └── ...           # Other pages
├── lib/              # Utilities and configurations
│   └── firebase.ts   # Firebase configuration
└── hooks/            # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
