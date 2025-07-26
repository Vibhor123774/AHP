// lib/emailService.js - Updated with your existing email setup

import nodemailer from 'nodemailer'

async function createTransporter() {
  return nodemailer.createTransport({ // Fixed: createTransport not createTransporter
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

// Password Reset Email Function
export async function sendPasswordResetEmail(email, resetUrl) {
  const transporter = await createTransporter();
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
        <h1>AHP - Password Reset</h1>
      </div>
      
      <div style="padding: 30px; background-color: #f9fafb;">
        <h2 style="color: #1f2937; margin-bottom: 20px;">Password Reset Request</h2>
        
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
          You have requested to reset your password for your Assignments Help Provider account.
        </p>
        
        <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
          Click the button below to reset your password. This link will expire in 1 hour.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #2563eb; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin-top: 30px;">
          If you didn't request this password reset, please ignore this email.
        </p>
        
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
        </p>
      </div>
      
      <div style="background-color: #374151; color: #d1d5db; padding: 20px; text-align: center; font-size: 12px;">
        <p>&copy; 2025 Assignments Help Provider. All rights reserved.</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset - Assignments Help Provider',
    html: emailContent
  };

  const result = await transporter.sendMail(mailOptions);
  console.log('Password reset email sent successfully:', result.messageId);
  return result;
}