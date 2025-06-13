
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  const { data, error } = await supabase
    .from("blogs")
    .select("id, title, excerpt, slug, tags, cover_image_url, created_at,meta_description, reading_time");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
