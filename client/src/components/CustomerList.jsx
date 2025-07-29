import React, { useState, useEffect } from 'react';
import { apiFetch } from '../utils/apiFetch';

function CustomerList({ token }) {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
console.log(customers)
  useEffect(() => {
    fetchCustomers();
    // eslint-disable-next-line
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await apiFetch('/api/customers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCustomers(data.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch customers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/customers/${editingId}` : '/api/customers';
      const method = editingId ? 'PUT' : 'POST';
      await apiFetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: form
      });
      setForm({ name: '', email: '', phone: '', address: '' });
      setEditingId(null);
      fetchCustomers();
    } catch (err) {
      setError(err.message || 'Something went wrong');
    }
  };

  const handleEdit = (customer) => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address });
    setEditingId(customer._id);
  };

  const handleDelete = async (id) => {
    try {
      await apiFetch(`/api/customers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchCustomers();
    } catch (err) {
      setError(err.message || 'Failed to delete customer');
    }
  };

  return (
    <div className="min-h-screen w-screen bg-blue-950 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/back.jpg')" }}>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-md">
          {editingId ? 'Edit Customer' : 'Add Customer'}
        </h2>
        {error && (
          <p className="text-red-300 mb-4 p-3 rounded-lg bg-red-900/20 backdrop-blur-lg border border-red-500/30">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="mb-10 p-8 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg">
          <div className="space-y-6">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Name"
              className="w-full p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-lg text-gray-100 placeholder-gray-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
            />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email"
              className="w-full p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-lg text-gray-100 placeholder-gray-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
              required
            />
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="Phone"
              className="w-full p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-lg text-gray-100 placeholder-gray-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Address"
              className="w-full p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-lg text-gray-100 placeholder-gray-400 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            />
            <button
              type="submit"
              className="w-full bg-blue-600/30 backdrop-blur-lg hover:bg-blue-600/40 text-white p-4 rounded-xl font-semibold border border-white/20 shadow-md transition-all duration-300 hover:shadow-xl"
            >
              {editingId ? 'Update' : 'Add'} Customer
            </button>
          </div>
        </form>
        <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-md">Customer List</h2>
        <div className="grid gap-6">
          {customers?.map(customer => (
            <div
              key={customer._id}
              className="p-6 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center transition-transform duration-300 hover:scale-[1.02] hover:bg-white/15"
            >
              <div className="mb-4 md:mb-0 text-gray-100">
                <p><span className="font-semibold text-blue-200">Name:</span> {customer.name}</p>
                <p><span className="font-semibold text-blue-200">Email:</span> {customer.email}</p>
                <p><span className="font-semibold text-blue-200">Phone:</span> {customer.phone}</p>
                <p><span className="font-semibold text-blue-200">Address:</span> {customer.address}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(customer)}
                  className="bg-yellow-400/30 backdrop-blur-lg hover:bg-yellow-400/40 text-gray-100 font-medium px-5 py-2 rounded-xl border border-yellow-300/20 shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="bg-red-500/30 backdrop-blur-lg hover:bg-red-500/40 text-gray-100 font-medium px-5 py-2 rounded-xl border border-red-400/20 shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerList;