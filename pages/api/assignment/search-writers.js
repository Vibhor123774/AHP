// pages/api/assignment/search-writers.js
import { supabaseServer } from '../../../lib/supabaseServer';
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

    console.log('Searching writers with query:', q);

    // Search writers by name or email with case-insensitive matching
    const { data: writers, error } = await supabaseServer
      .from('writers')
      .select('id, name, email, created_at')
      .or(`name.ilike.%${q}%,email.ilike.%${q}%`)
      .order('name')
      .limit(10);

    if (error) {
      console.error('Writer search error:', error);
      return res.status(500).json({ 
        message: 'Database error while searching writers',
        error: error.message 
      });
    }

    console.log('Found writers:', writers?.length || 0);

    res.status(200).json({
      writers: writers || []
    });

  } catch (error) {
    console.error('Writer search API error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message 
    });
  }
}