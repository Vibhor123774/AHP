import { supabaseServer } from '../../../lib/supabaseServer';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('🧪 Starting minimal insert test');

    // Test 1: Insert with only required fields
    const minimalData = {
      Assignment_Id: `MIN_${Date.now()}`,
      client_name: 'Test Client'
    };

    console.log('📝 Test 1 - Minimal data:', minimalData);

    const { data: result1, error: error1 } = await supabaseServer
      .from('AssignmentDetails')
      .insert([minimalData])
      .select();

    console.log('📊 Test 1 result:', { result1, error1 });

    if (error1) {
      console.log('❌ Test 1 failed, trying even more minimal...');
      
      // Test 2: Try with just Assignment_Id (if that's the only required field)
      const ultraMinimal = {
        Assignment_Id: `ULTRA_${Date.now()}`
      };

      console.log('📝 Test 2 - Ultra minimal:', ultraMinimal);

      const { data: result2, error: error2 } = await supabaseServer
        .from('AssignmentDetails')
        .insert([ultraMinimal])
        .select();

      console.log('📊 Test 2 result:', { result2, error2 });

      return res.status(200).json({
        message: 'Minimal tests completed',
        test1: {
          data: minimalData,
          result: result1,
          error: error1,
          success: !error1
        },
        test2: {
          data: ultraMinimal,
          result: result2,
          error: error2,
          success: !error2
        }
      });
    }

    // Test 1 succeeded, try adding fields one by one
    console.log('✅ Test 1 succeeded, testing incremental fields...');

    // Clean up test 1 data
    if (result1 && result1.length > 0) {
      await supabaseServer
        .from('AssignmentDetails')
        .delete()
        .eq('Assignment_Id', minimalData.Assignment_Id);
    }

    // Test 3: Add more fields incrementally
    const incrementalData = {
      Assignment_Id: `INC_${Date.now()}`,
      client_name: 'Test Client',
      client_code: 'TEST01',
      client_number: '+1234567890',
      amount: '100.00',
      currency: 'USD'
    };

    console.log('📝 Test 3 - Incremental data:', incrementalData);

    const { data: result3, error: error3 } = await supabaseServer
      .from('AssignmentDetails')
      .insert([incrementalData])
      .select();

    console.log('📊 Test 3 result:', { result3, error3 });

    // Clean up test 3 data
    if (result3 && result3.length > 0) {
      await supabaseServer
        .from('AssignmentDetails')
        .delete()
        .eq('Assignment_Id', incrementalData.Assignment_Id);
    }

    res.status(200).json({
      message: 'All minimal tests completed',
      test1: {
        data: minimalData,
        result: result1,
        error: error1,
        success: !error1
      },
      test3: {
        data: incrementalData,
        result: result3,
        error: error3,
        success: !error3
      }
    });

  } catch (error) {
    console.error('💥 Minimal test error:', error);
    res.status(500).json({
      message: 'Minimal test failed',
      error: error.message
    });
  }
}