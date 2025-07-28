const express = require('express');
const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const { jwtSecret } = require('../config');
const router = express.Router();

// Middleware to verify JWT
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create customer
router.post('/', auth, async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }
    const customer = new Customer({ name, email, phone, address, userId: req.user.userId });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create customer' });
  }
});

// Read all customers
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({ userId: req.user.userId });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
});

// Update customer
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, address } = req.body;
  try {
    const customer = await Customer.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.address = address || customer.address;
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update customer' });
  }
});

// Delete customer
router.delete('/:id', auth, async (req, res) => {
  try {
    const customer = await Customer.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete customer' });
  }
});

module.exports = router;