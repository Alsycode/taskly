import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/login');
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
        <p className="text-blue-300 text-center text-xl uppercase tracking-widest mb-2 font-semibold">
          Register for your Taskly account
        </p>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        <div className="space-y-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/50 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/50 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/30 border border-white/50 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="new-password"
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600/90 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
          >
            Register
          </button>
          <p className="mt-6 text-center text-white">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;