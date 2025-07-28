import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
  <div
      className="w-screen h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: "url('/back.jpg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 max-w-sm w-full shadow-lg border border-white/30">
        {/* Added instruction text */}
        <p className="text-blue-300 text-center text-xl uppercase tracking-widest mb-2 font-semibold">
          Login to your FlowClient account
        </p>

        
        {error && <p className="text-red-400 mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Username"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/50 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/50 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600/90 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Register option below the form */}
        <p className="mt-6 text-center text-white">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;