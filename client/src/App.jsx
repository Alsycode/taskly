import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CustomerList from './components/CustomerList';

// Main App component
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {token && (
          <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between">
              <h1 className="text-white text-lg font-bold">CRM App</h1>
              <button onClick={handleLogout} className="text-white">Logout</button>
            </div>
          </nav>
        )}
        <Routes>
          <Route path="/login" element={!token ? <Login setToken={setToken} /> : <Navigate to="/" />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={token ? <CustomerList token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;