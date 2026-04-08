import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Index from '@/pages/Index'
import Rooms from '@/pages/Rooms'
import RoomDetails from '@/pages/RoomDetails'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import MyBookings from '@/pages/MyBookings'
import AuthCallback from '@/pages/AuthCallback'
import AuthError from '@/pages/AuthError'
import LogoutCallbackPage from '@/pages/LogoutCallbackPage'
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute'
import './index.css' // Global styles

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/error" element={<AuthError />} />
            <Route path="/logout-callback" element={<LogoutCallbackPage />} />
            {/* Admin routes */}
            <Route path="/admin/*" element={<ProtectedAdminRoute />} />
          </Routes>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App

