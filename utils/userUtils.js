// utils/userUtils.js
import { supabase } from '../lib/supabase'

export async function createOrUpdateUser(clerkUser) {
  if (!clerkUser) return null

  try {
    // Check if user exists
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', clerkUser.id)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user:', fetchError)
      return null
    }

    const userData = {
      clerk_id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses[0]?.emailAddress,
      first_name: clerkUser.firstName,
      last_name: clerkUser.lastName,
    }

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabase
        .from('users')
        .update(userData)
        .eq('clerk_id', clerkUser.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        return null
      }

      return data
    } else {
      // Create new user with default role
      const { data, error } = await supabase
        .from('users')
        .insert({ ...userData, role: 'user' })
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        return null
      }

      return data
    }
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error)
    return null
  }
}

export async function getUserRole(clerkUserId) {
  if (!clerkUserId) return null

  try {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('clerk_id', clerkUserId)
      .single()

    if (error) {
      console.error('Error fetching user role:', error)
      return null
    }

    return data?.role || 'user'
  } catch (error) {
    console.error('Error in getUserRole:', error)
    return null
  }
}