import React from 'react'
import { Routes, Route } from 'react-router'
import { Navigate } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import OnBoardingPage from './pages/OnBoardingPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import NotificationPage from './pages/NotificationPage'
import toast, { Toaster } from 'react-hot-toast' //alert ot notification chupinchadaniki
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'

const App = () => {

  const { data: authData, isLoading, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const res = await axiosInstance.get('/me')
      return res.data
    },
    retry: false, //by default tanStack 3 times try chesthundhi if res = err while fetching
  })
  const authUser = authData?.user // /me route degara user:req.user ani rasam anuduke .user rayali eekada
  //using authUser we can authenticate routes
  console.log(authUser)
  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />

        <Route
          path="/notifications"
          element={authUser ? <NotificationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={authUser ? <OnBoardingPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App
