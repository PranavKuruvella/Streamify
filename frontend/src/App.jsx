import React from 'react'
import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import OnBoardingPage from './pages/OnBoardingPage'
import ChatPage from './pages/ChatPage'
import CallPage from './pages/CallPage'
import NotificationPage from './pages/NotificationPage'
import toast, {Toaster} from 'react-hot-toast' //alert ot notification chupinchadaniki
import {useQuery} from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'

const App = () => {
  return (
    <div className='h-screen'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/call" element={<CallPage />} />
        <Route path="/onboarding" element={<OnBoardingPage />} />
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
