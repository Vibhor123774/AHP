// pages/api/assignment/create.js
import { supabaseServer } from "../../../lib/supabaseServer";
import { verifyToken } from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('Assignment API called with body:', req.body);

    // Verify authentication
    const token = req.cookies['auth-token'];
    if (!token) {
      console.log('No auth token found');
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      console.log('Invalid token');
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      console.log('User is not admin:', decoded.role);
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
      addedBy,
      selectedClientId
    } = req.body;

    console.log('Extracted data:', { 
      clientName, clientNumber, dueDate, amount, currency, 
      writerName, writerEmail, writerDate, selectedClientId 
    });

    // Validate required fields
    if (!clientName || !clientNumber || !dueDate || !amount || !currency || !writerName || !writerEmail || !writerDate) {
      console.log('Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(writerEmail)) {
      console.log('Invalid email format:', writerEmail);
      return res.status(400).json({ message: 'Invalid email format' });
    }

    console.log('Starting client lookup/creation...');
    // Check/Create Client
    let client = await getOrCreateClient(clientName, clientNumber, selectedClientId);
    console.log('Client result:', client);
    
    console.log('Starting writer lookup/creation...');
    // Check/Create Writer
    let writer = await getOrCreateWriter(writerName, writerEmail);
    console.log('Writer result:', writer);

    console.log('Generating assignment ID...');
    // Generate Assignment ID
    const assignmentId = await generateAssignmentId();
    console.log('Generated assignment ID:', assignmentId);

    console.log('Generating client code...');
    // Generate Client Code based on the requirements
    const clientCode = generateClientCode(client.client_id || client.id, client.assignment_count + 1);
    console.log('Generated client code:', clientCode);

    // Format amount to ensure 2 decimal places
    let formattedAmount = amount.toString();
    if (!formattedAmount.includes('.')) {
      formattedAmount += '.00';
    } else if (formattedAmount.split('.')[1].length === 1) {
      formattedAmount += '0';
    }

    // Create assignment record
    const assignmentData = {
      Assignment_Id: assignmentId,
      client_name: clientName,
      client_code: clientCode,
      client_number: clientNumber,
      assignement_due_date: dueDate, // Note: keeping the typo as per your existing schema
      amount: formattedAmount,
      currency: currency,
      writer_name: writerName,
      writer_email: writerEmail,
      writer_submission_date: writerDate,
      added_by: addedBy || decoded.email,
      added_date_time: new Date().toISOString()
    };

    console.log('Creating assignment with data:', assignmentData);

    const { data: assignment, error: assignmentError } = await supabaseServer
      .from('AssignmentDetails')
      .insert([assignmentData])
      .select();

    console.log('Insert result - data:', assignment, 'error:', assignmentError);

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

    console.log('Assignment created successfully:', assignment[0]);

    // Update client assignment count
    console.log('Updating client assignment count...');
    const { error: updateError } = await supabaseServer
      .from('clients')
      .update({ 
        assignment_count: client.assignment_count + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', client.id);

    if (updateError) {
      console.error('Client update error:', updateError);
      // Don't fail the request for this, but log it
    }

    console.log('Assignment creation completed successfully');

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
async function getOrCreateClient(clientName, clientNumber, selectedClientId = null) {
  try {
    console.log('Searching for existing client:', clientName, 'ID:', selectedClientId);
    
    let existingClient = null;

    // If we have a selected client ID, try to get that specific client first
    if (selectedClientId) {
      const { data: clientById, error: searchByIdError } = await supabaseServer
        .from('clients')
        .select('*')
        .eq('id', selectedClientId)
        .maybeSingle();

      if (!searchByIdError && clientById) {
        console.log('Found client by ID:', clientById);
        existingClient = clientById;
      }
    }

    // If no client found by ID, search by name
    if (!existingClient) {
      const { data: clientByName, error: searchError } = await supabaseServer
        .from('clients')
        .select('*')
        .eq('name', clientName)
        .maybeSingle();

      if (searchError) {
        console.error('Client search error:', searchError);
        throw searchError;
      }

      if (clientByName) {
        console.log('Found existing client by name:', clientByName);
        existingClient = clientByName;
      }
    }

    if (existingClient) {
      return existingClient;
    }

    console.log('Creating new client...');
    // If client doesn't exist, create new one
    // Get the next client_id by finding the highest existing client_id
    const { data: lastClient, error: lastClientError } = await supabaseServer
      .from('clients')
      .select('client_id')
      .order('client_id', { ascending: false })
      .limit(1)
      .maybeSingle();

    let nextClientId = 1;
    if (!lastClientError && lastClient && lastClient.client_id) {
      nextClientId = lastClient.client_id + 1;
    }

    const { data: newClient, error: createError } = await supabaseServer
      .from('clients')
      .insert([{
        name: clientName,
        phone: clientNumber,
        client_id: nextClientId,
        assignment_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (createError) {
      console.error('Client creation error:', createError);
      throw createError;
    }

    console.log('Created new client:', newClient);
    return newClient;
  } catch (error) {
    console.error('getOrCreateClient error:', error);
    throw error;
  }
}

// Helper function to get or create writer
async function getOrCreateWriter(writerName, writerEmail) {
  try {
    console.log('Searching for existing writer:', writerEmail);
    
    // First, try to find existing writer by email
    const { data: existingWriter, error: searchError } = await supabaseServer
      .from('writers')
      .select('*')
      .eq('email', writerEmail)
      .maybeSingle();

    if (searchError) {
      console.error('Writer search error:', searchError);
      throw searchError;
    }

    if (existingWriter) {
      console.log('Found existing writer:', existingWriter);
      return existingWriter;
    }

    console.log('Creating new writer...');
    // If writer doesn't exist, create new one
    const { data: newWriter, error: createError } = await supabaseServer
      .from('writers')
      .insert([{
        name: writerName,
        email: writerEmail,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (createError) {
      console.error('Writer creation error:', createError);
      throw createError;
    }

    console.log('Created new writer:', newWriter);
    return newWriter;
  } catch (error) {
    console.error('getOrCreateWriter error:', error);
    throw error;
  }
}

// Helper function to generate Assignment ID according to PDF requirements
async function generateAssignmentId() {
  try {
    // Get the latest assignment to determine the next sequence number
    const { data, error } = await supabaseServer
      .from('AssignmentDetails')
      .select('Assignment_Id')
      .order('added_date_time', { ascending: false })
      .limit(1)
      .maybeSingle();

    let nextNumber = 1;
    
    if (!error && data && data.Assignment_Id) {
      // Extract number from existing ID (e.g., "AHP_001" -> 1)
      const match = data.Assignment_Id.match(/AHP_(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    // Format as AHP_XXX where XXX is zero-padded 3-digit number
    return `AHP_${String(nextNumber).padStart(3, '0')}`;
  } catch (error) {
    console.error('Assignment ID generation error:', error);
    // Fallback: use timestamp-based ID
    const timestamp = Date.now().toString().slice(-6);
    return `AHP_T${timestamp}`;
  }
}

// Helper function to generate Client Code according to PDF requirements
// Format: AHPXClientIdXAssignmentSequenceNo (e.g., AHPX01X0001)
function generateClientCode(clientId, taskSequence) {
  const paddedClientId = String(clientId).padStart(2, '0');
  const paddedTaskSequence = String(taskSequence).padStart(4, '0');
  return `AHPX${paddedClientId}X${paddedTaskSequence}`;
}