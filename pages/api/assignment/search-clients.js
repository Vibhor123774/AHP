// pages/api/assignment/search-clients.js
import { supabaseServer } from "../../../lib/supabaseServer";
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Verify authentication
    const token = req.cookies['auth-token'];
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { q } = req.query; // search query

    if (!q || q.length < 2) {
      return res.status(400).json({ message: 'Search query must be at least 2 characters' });
    }

    console.log('Searching clients with query:', q);

    // Search clients by name with case-insensitive matching
    const { data: clients, error } = await supabaseServer
      .from('clients')
      .select('id, name, phone, client_id, assignment_count, created_at')
      .ilike('name', `%${q}%`)
      .order('assignment_count', { ascending: false }) // Show clients with more assignments first
      .limit(10);

    if (error) {
      console.error('Client search error:', error);
      return res.status(500).json({ 
        message: 'Database error while searching clients',
        error: error.message 
      });
    }

    console.log('Found clients:', clients?.length || 0);

    res.status(200).json({
      clients: clients || []
    });

  } catch (error) {
    console.error('Client search API error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}