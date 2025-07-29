import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { apiFetch } from "../utils/apiFetch"
function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      });
      console.log(data)
      localStorage.setItem('token', data.token);
      setToken(data.data.token);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Something went wrong');
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