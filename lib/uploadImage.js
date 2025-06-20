import { supabase } from './supabase'

export const uploadImageToSupabase = async (file, folder) => {
  const filePath = `${Date.now()}-${file.name}`

  const { data, error } = await supabase.storage
    .from(folder)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Upload failed:', error.message)
    return null
  }

  const publicUrlResponse = supabase.storage.from(folder).getPublicUrl(filePath)

  return publicUrlResponse.data.publicUrl
}
