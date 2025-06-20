import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  const { slug } = req.query

  if (!slug) return res.status(400).json({ error: 'Missing slug' })

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return res.status(404).json({ error: error.message })

  res.status(200).json(data)
}
