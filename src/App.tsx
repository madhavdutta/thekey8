import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { Settings } from './pages/Settings'
import { MainLayout } from './components/layouts/MainLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AuthCallback } from './routes/auth-callback'
import { ThemeProvider } from './contexts/themecontext'
import { Application } from './pages/application'

function App(): JSX.Element {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/application" element={<Application />} />
          </Route>
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App