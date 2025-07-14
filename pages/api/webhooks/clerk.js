// pages/api/webhooks/clerk.js
import { Webhook } from 'svix'
import { supabaseAdmin } from '../../../lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to your environment variables')
  }

  if (!supabaseAdmin) {
    throw new Error('Supabase admin client not available')
  }

  const headers = req.headers
  const payload = JSON.stringify(req.body)

  const svix_id = headers['svix-id']
  const svix_timestamp = headers['svix-timestamp']
  const svix_signature = headers['svix-signature']

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ message: 'Missing svix headers' })
  }

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return res.status(400).json({ message: 'Error verifying webhook' })
  }

  const { type, data } = evt

  try {
    switch (type) {
      case 'user.created':
        await createUser(data)
        break
      case 'user.updated':
        await updateUser(data)
        break
      case 'user.deleted':
        await deleteUser(data)
        break
      default:
        console.log(`Unhandled event type: ${type}`)
    }

    res.status(200).json({ message: 'Webhook processed successfully' })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({ message: 'Error processing webhook' })
  }
}

async function createUser(userData) {
  const { error } = await supabaseAdmin
    .from('users')
    .insert({
      clerk_id: userData.id,
      email: userData.email_addresses[0]?.email_address,
      first_name: userData.first_name,
      last_name: userData.last_name,
      role: 'user' // Default role
    })

  if (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

async function updateUser(userData) {
  const { error } = await supabaseAdmin
    .from('users')
    .update({
      email: userData.email_addresses[0]?.email_address,
      first_name: userData.first_name,
      last_name: userData.last_name
    })
    .eq('clerk_id', userData.id)

  if (error) {
    console.error('Error updating user:', error)
    throw error
  }
}

async function deleteUser(userData) {
  const { error } = await supabaseAdmin
    .from('users')
    .delete()
    .eq('clerk_id', userData.id)

  if (error) {
    console.error('Error deleting user:', error)
    throw error
  }
}