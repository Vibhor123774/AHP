import { supabase } from './supabase';

export async function uploadFilesToSupabase(files) {
  const uploadPromises = files.map(async (file) => {
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `contact-files/${fileName}`;
    
    const { data, error } = await supabase.storage
      .from('contact-files')
      .upload(filePath, file);
    
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('contact-files')
      .getPublicUrl(filePath);
    
    return {
      fileName: file.name,
      filePath: filePath,
      publicUrl: publicUrl
    };
  });
  
  return Promise.all(uploadPromises);
}

export async function downloadFileFromSupabase(filePath) {
  const { data, error } = await supabase.storage
    .from('contact-files')
    .download(filePath);
  
  if (error) {
    console.error('Download error:', error);
    throw error;
  }
  
  return data;
}