import React, { useState, useEffect } from 'react';

function CustomerList({ token }) {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // Fetch customers on mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setCustomers(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to fetch customers');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId
        ? `http://localhost:5000/api/customers/${editingId}`
        : 'http://localhost:5000/api/customers';
      const method = editingId ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (response.ok) {
        setForm({ name: '', email: '', phone: '', address: '' });
        setEditingId(null);
        fetchCustomers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong');
    }
  };

  const handleEdit = (customer) => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address });
    setEditingId(customer._id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        fetchCustomers();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Customer' : 'Add Customer'}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <div className="space-y-4">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <button onClick={handleSubmit} className="w-full bg-blue-600 text-white p-2 rounded">
            {editingId ? 'Update' : 'Add'} Customer
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <div className="grid gap-4">
        {customers.map(customer => (
          <div key={customer._id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <p><strong>Name:</strong> {customer.name}</p>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <p><strong>Address:</strong> {customer.address}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(customer)} className="bg-yellow-500 text-white p-2 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(customer._id)} className="bg-red-500 text-white p-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerList;