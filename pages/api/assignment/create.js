// pages/api/assignment/create.js
import { supabaseServer } from "../../../lib/supabaseServer";
import { verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Assignment API called with body:', req.body); // Debug log

    // Verify authentication
    const token = req.cookies['auth-token'];
    if (!token) {
      console.log('No auth token found'); // Debug log
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      console.log('Invalid token'); // Debug log
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      console.log('User is not admin:', decoded.role); // Debug log
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }

    const {
      clientName,
      clientNumber,
      dueDate,
      amount,
      currency,
      writerName,
      writerEmail,
      writerDate,
      addedBy
    } = req.body;

    console.log('Extracted data:', { clientName, clientNumber, dueDate, amount, currency, writerName, writerEmail, writerDate }); // Debug log

    // Validate required fields
    if (!clientName || !clientNumber || !dueDate || !amount || !currency || !writerName || !writerEmail || !writerDate) {
      console.log('Missing required fields'); // Debug log
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(writerEmail)) {
      console.log('Invalid email format:', writerEmail); // Debug log
      return res.status(400).json({ message: 'Invalid email format' });
    }

    console.log('Starting client lookup/creation...'); // Debug log
    // Check/Create Client
    let client = await getOrCreateClient(clientName, clientNumber);
    console.log('Client result:', client); // Debug log
    
    console.log('Starting writer lookup/creation...'); // Debug log
    // Check/Create Writer
    let writer = await getOrCreateWriter(writerName, writerEmail);
    console.log('Writer result:', writer); // Debug log

    console.log('Generating assignment ID...'); // Debug log
    // Generate Assignment ID
    const assignmentId = await generateAssignmentId();
    console.log('Generated assignment ID:', assignmentId); // Debug log

    console.log('Generating client code...'); // Debug log
    // Generate Client Code
    const clientCode = generateClientCode(client.client_id, client.assignment_count + 1);
    console.log('Generated client code:', clientCode); // Debug log

    // Create assignment record
    const assignmentData = {
      Assignment_Id: assignmentId,
      client_name: clientName,
      client_code: clientCode,
      client_number: clientNumber,
      assignement_due_date: dueDate,
      amount: amount,
      currency: currency,
      writer_name: writerName,
      writer_email: writerEmail,
      writer_submission_date: writerDate,
      added_by: addedBy || decoded.email
    };

    console.log('Creating assignment with data:', assignmentData); // Debug log

    const { data: assignment, error: assignmentError } = await supabaseServer
      .from('AssignmentDetails')
      .insert([assignmentData])
      .select();

    console.log('Insert result - data:', assignment, 'error:', assignmentError); // Debug log

    if (assignmentError) {
      console.error('Assignment creation error:', assignmentError);
      return res.status(500).json({ 
        message: 'Failed to create assignment',
        error: assignmentError.message || 'Database insert failed',
        details: assignmentError
      });
    }

    if (!assignment || assignment.length === 0) {
      console.error('No assignment data returned after insert');
      return res.status(500).json({ 
        message: 'Assignment creation failed - no data returned'
      });
    }

    console.log('Assignment created successfully:', assignment[0]); // Debug log

    // Update client assignment count
    console.log('Updating client assignment count...'); // Debug log
    const { error: updateError } = await supabaseServer
      .from('clients')
      .update({ 
        assignment_count: client.assignment_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', client.id);

    if (updateError) {
      console.error('Client update error:', updateError);
      // Don't fail the request for this
    }

    console.log('Assignment creation completed successfully'); // Debug log

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment: assignment[0],
      assignmentId: assignmentId,
      clientCode: clientCode
    });

  } catch (error) {
    console.error('Assignment API error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: error.message || 'Unknown error'
    });
  }
}

// Helper function to get or create client
async function getOrCreateClient(clientName, clientNumber) {
  try {
    console.log('Searching for existing client:', clientName); // Debug log
    
    // First, try to find existing client by name
    const { data: existingClient, error: searchError } = await supabaseServer
      .from('clients')
      .select('*')
      .eq('name', clientName)
      .maybeSingle(); // Use maybeSingle instead of single to avoid error when not found

    if (searchError) {
      console.error('Client search error:', searchError);
      throw searchError;
    }

    if (existingClient) {
      console.log('Found existing client:', existingClient); // Debug log
      return existingClient;
    }

    console.log('Creating new client...'); // Debug log
    // If client doesn't exist, create new one
    const { data: newClient, error: createError } = await supabaseServer
      .from('clients')
      .insert([{
        name: clientName,
        phone: clientNumber,
        assignment_count: 0
      }])
      .select()
      .single();

    if (createError) {
      console.error('Client creation error:', createError);
      throw createError;
    }

    console.log('Created new client:', newClient); // Debug log
    return newClient;
  } catch (error) {
    console.error('getOrCreateClient error:', error);
    throw error;
  }
}

// Helper function to get or create writer
async function getOrCreateWriter(writerName, writerEmail) {
  try {
    console.log('Searching for existing writer:', writerEmail); // Debug log
    
    // First, try to find existing writer by email
    const { data: existingWriter, error: searchError } = await supabaseServer
      .from('writers')
      .select('*')
      .eq('email', writerEmail)
      .maybeSingle(); // Use maybeSingle instead of single to avoid error when not found

    if (searchError) {
      console.error('Writer search error:', searchError);
      throw searchError;
    }

    if (existingWriter) {
      console.log('Found existing writer:', existingWriter); // Debug log
      return existingWriter;
    }

    console.log('Creating new writer...'); // Debug log
    // If writer doesn't exist, create new one
    const { data: newWriter, error: createError } = await supabaseServer
      .from('writers')
      .insert([{
        name: writerName,
        email: writerEmail
      }])
      .select()
      .single();

    if (createError) {
      console.error('Writer creation error:', createError);
      throw createError;
    }

    console.log('Created new writer:', newWriter); // Debug log
    return newWriter;
  } catch (error) {
    console.error('getOrCreateWriter error:', error);
    throw error;
  }
}

// Helper function to generate Assignment ID
async function generateAssignmentId() {
  try {
    // Use built-in nextval function directly
    const { data, error } = await supabaseServer
      .from('AssignmentDetails')
      .select('Assignment_Id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    let nextNumber = 1;
    
    if (!error && data && data.Assignment_Id) {
      // Extract number from existing ID (e.g., "AHP_001" -> 1)
      const match = data.Assignment_Id.match(/AHP_(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    return `AHP_${String(nextNumber).padStart(3, '0')}`;
  } catch (error) {
    console.error('Assignment ID generation error:', error);
    // Fallback: use timestamp-based ID
    const timestamp = Date.now().toString().slice(-6);
    return `AHP_T${timestamp}`;
  }
}

// Helper function to generate Client Code
function generateClientCode(clientId, taskSequence) {
  const paddedClientId = String(clientId).padStart(2, '0');
  const paddedTaskSequence = String(taskSequence).padStart(4, '0');
  return `AHPX${paddedClientId}X${paddedTaskSequence}`;
}