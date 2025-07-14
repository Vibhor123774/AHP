import { supabase } from './supabase';
import { decrypt } from './encryption';

export async function getDecryptedSubmission(submissionId) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .eq('id', submissionId)
    .single();

  if (error) {
    throw error;
  }

  // Decrypt the sensitive fields
  return {
    ...data,
    email: decrypt(data.email_encrypted),
    phone: decrypt(data.phone_encrypted)
  };
}

export async function getAllDecryptedSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw error;
  }

  // Decrypt all submissions
  return data.map(submission => ({
    ...submission,
    email: decrypt(submission.email_encrypted),
    phone: decrypt(submission.phone_encrypted)
  }));
}