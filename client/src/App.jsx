import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CustomerList from './components/CustomerList';

// Main App component
function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
console.log(token)
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-blue-950 bg-cover bg-center" style={{ backgroundImage: "url('/back.jpg')" }}>
        {token && (
          <nav className="bg-blue-600/10 backdrop-blur-2xl border border-white/20 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-white text-xl font-bold drop-shadow-md">FLOWCLIENT</h1>
              <button 
                onClick={handleLogout} 
                className="text-gray-100 bg-blue-500/30 backdrop-blur-lg hover:bg-blue-500/40 font-medium px-4 py-2 rounded-xl border border-white/20 transition-all duration-300 hover:shadow-xl"
              >
                Logout
              </button>
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