// lib/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { supabaseServer } from './supabaseServer'; // Use server client

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Hash password
export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Get user by email
export async function getUserByEmail(email) {
  const { data, error } = await supabaseServer
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return null;
  return data;
}

// Create user
export async function createUser(email, password, role = 'seo') {
  const hashedPassword = await hashPassword(password);
  
  const { data, error } = await supabaseServer
    .from('users')
    .insert([
      {
        email,
        password_hash: hashedPassword,
        role
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Generate password reset token
export function generateResetToken() {
  return jwt.sign(
    { timestamp: Date.now() },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

// Store password reset token
export async function storePasswordResetToken(email, token) {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const { data, error } = await supabaseServer
    .from('password_resets')
    .insert([
      {
        email,
        token,
        expires_at: expiresAt.toISOString()
      }
    ]);

  if (error) throw error;
  return data;
}

// Verify password reset token
export async function verifyPasswordResetToken(token) {
  const { data, error } = await supabaseServer
    .from('password_resets')
    .select('*')
    .eq('token', token)
    .eq('used', false)
    .gt('expires_at', new Date().toISOString())
    .single();

  if (error || !data) return null;
  return data;
}

// Mark reset token as used
export async function markTokenAsUsed(token) {
  const { error } = await supabaseServer
    .from('password_resets')
    .update({ used: true })
    .eq('token', token);

  if (error) throw error;
}

// Update user password
export async function updateUserPassword(email, newPassword) {
  const hashedPassword = await hashPassword(newPassword);
  
  const { data, error } = await supabaseServer
    .from('users')
    .update({ 
      password_hash: hashedPassword,
      updated_at: new Date().toISOString()
    })
    .eq('email', email);

  if (error) throw error;
  return data;
}