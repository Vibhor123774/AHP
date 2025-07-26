// pages/api/auth/signup.js
import { createUser } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Create user with default 'seo' role
    // Admin will manually change role in database if needed
    const user = await createUser(email, password, '');

    res.status(201).json({
      message: 'User created successfully. Please contact admin to set your role.',
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error.code === '23505') { // Unique constraint violation
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    res.status(500).json({ message: 'Internal server error' });
  }
}