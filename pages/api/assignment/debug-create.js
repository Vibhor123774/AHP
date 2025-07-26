// pages/api/assignment/debug-create.js
// Debug version with detailed logging
import { supabaseServer } from '../../../lib/supabaseServer';
import { verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🚀 DEBUG: Starting assignment creation');
    console.log('📝 Request body:', JSON.stringify(req.body, null, 2));

    // Check authentication
    const token = req.cookies['auth-token'];
    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    console.log('✅ Auth check passed:', decoded.email, decoded.role);

    const {
      clientName,
      clientNumber,
      dueDate,
      amount,
      currency,
      writerName,
      writerEmail,
      writerDate
    } = req.body;

    // Create the assignment data
    const assignmentData = {
      Assignment_Id: `AHP_${Date.now().toString().slice(-6)}`,
      client_name: clientName,
      client_code: `AHPX01X${Date.now().toString().slice(-4)}`,
      client_number: clientNumber,
      assignement_due_date: dueDate,
      amount: amount,
      currency: currency,
      writer_name: writerName,
      writer_email: writerEmail,
      writer_submission_date: writerDate,
      added_by: decoded.email
    };

    console.log('📊 Assignment data to insert:', JSON.stringify(assignmentData, null, 2));

    // Try the insert
    const { data: result, error } = await supabaseServer
      .from('AssignmentDetails')
      .insert([assignmentData])
      .select();

    console.log('🔍 Insert result:');
    console.log('  - Data:', result);
    console.log('  - Error:', error);
    console.log('  - Error type:', typeof error);
    console.log('  - Error keys:', error ? Object.keys(error) : 'none');

    if (error) {
      console.error('❌ Insert failed with error:', error);
      return res.status(500).json({
        message: 'Assignment creation failed',
        error: error.message || 'Unknown error',
        errorDetails: error,
        assignmentData: assignmentData
      });
    }

    if (!result || result.length === 0) {
      console.error('❌ No data returned from insert');
      return res.status(500).json({
        message: 'No data returned from insert',
        assignmentData: assignmentData
      });
    }

    console.log('✅ Assignment created successfully!');
    console.log('📄 Created assignment:', result[0]);

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment: result[0]
    });

  } catch (error) {
    console.error('💥 Unexpected error:', error);
    res.status(500).json({
      message: 'Unexpected error',
      error: error.message,
      stack: error.stack
    });
  }
}