import nodemailer from 'nodemailer'

async function createTransporter() {
  return nodemailer.createTransport({ // Fix: createTransport not createTransporter
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

export async function sendContactEmail(originalFormData, fileUploads) {
  const transporter = await createTransporter();
  
  // Prepare attachments
  const attachments = [];
  
  if (fileUploads && fileUploads.length > 0) {
    // Import the download function dynamically to avoid issues
    const { downloadFileFromSupabase } = await import('./fileUpload');
    
    for (const fileInfo of fileUploads) {
      try {
        const fileData = await downloadFileFromSupabase(fileInfo.filePath);
        const buffer = Buffer.from(await fileData.arrayBuffer());
        
        attachments.push({
          filename: fileInfo.fileName,
          content: buffer
        });
      } catch (error) {
        console.error(`Error downloading file ${fileInfo.fileName}:`, error);
      }
    }
  }
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Send to yourself
    subject: `New Contact Form Submission - ${originalFormData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${originalFormData.name}</p>
      <p><strong>Email:</strong> ${originalFormData.email}</p>
      <p><strong>Phone:</strong> ${originalFormData.phone}</p>
      <p><strong>Service:</strong> ${originalFormData.service}</p>
      <p><strong>Subject:</strong> ${originalFormData.subject}</p>
      <p><strong>Number of Pages:</strong> ${originalFormData.pageNumber}</p>
      <p><strong>Due Date:</strong> ${originalFormData.dueDate || 'Not specified'}</p>
      <p><strong>Files Attached:</strong> ${fileUploads ? fileUploads.length : 0} file(s)</p>
      <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
    `,
    attachments: attachments
  };
  
  const result = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully:', result.messageId);
  return result;
}