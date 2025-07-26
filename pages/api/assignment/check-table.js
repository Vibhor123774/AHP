// pages/api/assignment/check-table.js
import { supabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Method 1: Try to get table structure by attempting to select with no results
    const { data: structureData, error: structureError } = await supabaseServer
      .from('AssignmentDetails')
      .select('*')
      .limit(0);

    console.log('Structure check:', { structureData, structureError });

    // Method 2: Get existing data to see structure
    const { data: sampleData, error: sampleError } = await supabaseServer
      .from('AssignmentDetails')
      .select('*')
      .limit(1);

    console.log('Sample data:', { sampleData, sampleError });

    // Method 3: Try a minimal insert to see what fails
    const testData = {
      Assignment_Id: 'TEST_STRUCTURE_CHECK',
      client_name: 'Test'
    };

    const { data: testInsert, error: testError } = await supabaseServer
      .from('AssignmentDetails')
      .insert([testData]);

    console.log('Test insert:', { testInsert, testError });

    // Clean up test data if it was inserted
    if (!testError) {
      await supabaseServer
        .from('AssignmentDetails')
        .delete()
        .eq('Assignment_Id', 'TEST_STRUCTURE_CHECK');
    }

    res.status(200).json({
      message: 'Table structure check completed',
      results: {
        structureCheck: {
          error: structureError?.message || null,
          success: !structureError
        },
        sampleData: {
          error: sampleError?.message || null,
          data: sampleData || null,
          count: sampleData?.length || 0
        },
        testInsert: {
          error: testError?.message || null,
          errorDetails: testError || null,
          success: !testError
        }
      }
    });

  } catch (error) {
    console.error('Table check error:', error);
    res.status(500).json({
      message: 'Table check failed',
      error: error.message
    });
  }
}