
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PollPage from './pages/PollPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { PollProvider } from './context/PollContext';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer, toast } from 'react-toastify';
import CreatePoll from './components/CreatePoll';
import 'react-toastify/dist/ReactToastify.css';
import PollResults from './components/PollResults';
import Notification from './components/Notification';

function App() {
  return (
    <AuthProvider>
      <PollProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            {/* */}   {/* <Route path="/poll/:id" element={<ProtectedRoute><PollPage /></ProtectedRoute>} /> */}
            <Route path="/create-poll" element={<ProtectedRoute><CreatePoll /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/poll/:id" element={<ProtectedRoute><PollPage /></ProtectedRoute>} />
            <Route path="/poll/:id/results" element={<ProtectedRoute><PollResults /></ProtectedRoute>} />
          </Routes>
        </Router>
        <ToastContainer />
      </PollProvider>
    </AuthProvider>
  );
}

export default App;