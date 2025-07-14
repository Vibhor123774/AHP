import { supabase } from '../../lib/supabase';
import { uploadFilesToSupabase } from '../../lib/fileUpload';
import { sendContactEmail } from '../../lib/emailService';
import { encrypt } from '../../lib/encryption';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse form data
    const form = formidable({
      multiples: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    const [fields, files] = await form.parse(req);
    
    // Extract original form data
    const originalFormData = {
      name: Array.isArray(fields.name) ? fields.name[0] : fields.name,
      email: Array.isArray(fields.email) ? fields.email[0] : fields.email,
      phone: Array.isArray(fields.phone) ? fields.phone[0] : fields.phone,
      service: Array.isArray(fields.service) ? fields.service[0] : fields.service,
      subject: Array.isArray(fields.subject) ? fields.subject[0] : fields.subject,
      pageNumber: Array.isArray(fields.pageNumber) ? fields.pageNumber[0] : fields.pageNumber,
      dueDate: Array.isArray(fields.dueDate) ? fields.dueDate[0] : fields.dueDate,
    };

    console.log('Original form data:', originalFormData); // Debug log

    // Handle file uploads
    let fileUploads = [];
    if (files.assignmentFile) {
      const fileArray = Array.isArray(files.assignmentFile) ? files.assignmentFile : [files.assignmentFile];
      
      // Convert to File objects for upload
      const fileObjects = fileArray.map(file => {
        const buffer = fs.readFileSync(file.filepath);
        return new File([buffer], file.originalFilename, { type: file.mimetype });
      });
      
      fileUploads = await uploadFilesToSupabase(fileObjects);
      console.log('Files uploaded:', fileUploads.length); // Debug log
    }

    // Encrypt sensitive user data before storing
    const encryptedEmail = encrypt(originalFormData.email);
    const encryptedPhone = encrypt(originalFormData.phone);

    // Format date properly for PostgreSQL
    let formattedDueDate = null;
    if (originalFormData.dueDate && originalFormData.dueDate !== 'undefined') {
      const date = new Date(originalFormData.dueDate);
      if (!isNaN(date.getTime())) {
        formattedDueDate = date.toISOString().split('T')[0];
      }
    }

    // Store in Supabase with encrypted email and phone
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: originalFormData.name,
          email_encrypted: encryptedEmail,
          phone_encrypted: encryptedPhone,
          service: originalFormData.service,
          subject: originalFormData.subject,
          page_number: originalFormData.pageNumber,
          due_date: formattedDueDate,
          file_urls: fileUploads.map(f => f.publicUrl),
        }
      ]);

    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error', error: error.message });
    }

    console.log('Data stored in database successfully'); // Debug log

    // Send email with ORIGINAL (unencrypted) form data
    try {
      await sendContactEmail(originalFormData, fileUploads);
      console.log('Email sent successfully'); // Debug log
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Still return success since data was saved, but log the email error
    }

    res.status(200).json({ message: 'Form submitted successfully' });

  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}