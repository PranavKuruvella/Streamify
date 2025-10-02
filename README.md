# Streamify


Streamify is a full-stack real-time chat and video calling application with a focus on language sharing. Its main motto is to connect users from different language backgrounds, allowing them to mention their native and learning languages, and learn from peer members through real-time chat and video calls. It features one-on-one chat, video calling, reactions, authentication, notifications, and a modern UI built with React and Tailwind CSS. The backend is powered by Node.js, Express, and MongoDB.

## Table of Contents
- [Project Structure](#project-structure)
- [Main Features](#main-features)
- [Tech Stack & Libraries](#tech-stack--libraries)
- [Setup Instructions](#setup-instructions)

---

## Project Structure

```
streamify/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── server.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── chat.controller.js
│   │   │   └── user.controller.js
│   │   ├── lib/
│   │   │   ├── db.js
│   │   │   └── stream.js
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── FriendRequest.js
│   │   │   └── User.js
│   │   └── routes/
│   │       ├── auth.route.js
│   │       ├── chat.route.js
│   │       └── user.route.js
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── public/
│   │   └── i.png
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── CallButton.jsx
│       │   ├── ChatLoader.jsx
│       │   ├── FriendCard.jsx
│       │   ├── Layout.jsx
│       │   ├── Navbar.jsx
│       │   ├── NoFriendsFound.jsx
│       │   ├── NoNotificationsFound.jsx
│       │   ├── PageLoader.jsx
│       │   ├── Sidebar.jsx
│       │   └── ThemeSelector.jsx
│       ├── constants/
│       │   └── index.js
│       ├── hooks/
│       │   ├── useAuthUser.js
│       │   ├── useLogin.js
│       │   ├── useLogout.js
│       │   └── useSignUp.js
│       ├── lib/
│       │   ├── api.js
│       │   ├── axios.js
│       │   └── utils.js
│       ├── pages/
│       │   ├── CallPage.jsx
│       │   ├── ChatPage.jsx
│       │   ├── FriendsPage.jsx
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── NotificationPage.jsx
│       │   ├── OnBoardingPage.jsx
│       │   └── SignUpPage.jsx
│       └── store/
│           └── useThemeStore.jsx
```

---



## Main Features

- **Language Sharing:** Users can specify their native and learning languages, discover and connect with peers for language exchange, and learn directly from other members.
- **One-on-One Chat:** Real-time messaging between users with chat history, implemented using efficient streaming techniques for low-latency delivery.
- **Video Calling:** Peer-to-peer video calls using WebRTC, with stream management for smooth and reliable video/audio transmission.
- **Reactions:** Send emoji reactions in chat.
- **Authentication:** Secure sign up, login, and JWT-based authentication.
- **Friend Requests:** Send, accept, and manage friend requests.
- **Notifications:** Real-time notifications for messages, calls, and friend requests.
- **Modern UI:** Responsive and themeable interface with Tailwind CSS.
- **User Onboarding:** Guided onboarding for new users.

---

## Notable Practices & Highlights

- **Streaming for Chat & Video Calls:**
   - Utilized Node.js streams and Socket.io for efficient, real-time data transfer in both chat and video call features.
   - Leveraged WebRTC for direct peer-to-peer video/audio streaming, ensuring minimal latency and high quality.
   - Designed backend logic to handle stream events, manage connections, and broadcast updates efficiently.

- **Best Practices Followed:**
   - Modular code structure (controllers, middleware, models, routes, hooks, components).
   - Secure authentication using JWT and middleware for route protection.
   - Environment variables for sensitive configuration.
   - RESTful API design and separation of concerns between frontend and backend.
   - Responsive, accessible, and themeable UI with Tailwind CSS.
   - Custom React hooks for code reuse and cleaner state management.
   - Error handling and user feedback throughout the app.
   - Real-time updates and notifications using Socket.io.

---

## Tech Stack & Libraries

### Frontend
- **React** (Vite)
- **Tailwind CSS**
- **Axios** (API requests)
- **React Router** (routing)
- **Custom Hooks** (authentication, theme, etc.)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (with Mongoose)
- **JWT** (authentication)
- **Stream** (real-time communication and video calling)

---


## Environment Variables

The backend requires a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5001
MONGO_URI=URI
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret_key
```

**Descriptions:**
- `PORT`: The port number for the backend server.
- `MONGO_URI`: MongoDB connection string for the database.
- `STREAM_API_KEY` & `STREAM_API_SECRET`: Credentials for Stream API (used for real-time chat and video call features).
- `JWT_SECRET_KEY`: Secret key for signing JWT tokens (authentication).

Make sure to keep these values secure and never expose secrets in public repositories.

---
## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd streamify
   ```
2. **Install dependencies:**
   - Backend:
     ```sh
     cd backend
     npm install
     ```
   - Frontend:
     ```sh
     cd ../frontend
     npm install
     ```
3. **Configure environment variables:**
   - Add your MongoDB URI, JWT secret, and other configs in the backend `.env` file.
4. **Run the backend server:**
   ```sh
   cd backend
   npm start
   ```
5. **Run the frontend app:**
   ```sh
   cd frontend
   npm run dev
   ```

---

## License

MIT License
