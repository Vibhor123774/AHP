// context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { createOrUpdateUser, getUserRole } from '../utils/userUtils'

const UserContext = createContext()

export function UserProvider({ children }) {
  const { user, isLoaded } = useUser()
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserRole() {
      if (!user) {
        setUserRole(null)
        setLoading(false)
        return
      }

      try {
        // First, try to create or update user in Supabase
        await createOrUpdateUser(user)
        
        // Then fetch the role
        const role = await getUserRole(user.id)
        setUserRole(role)
      } catch (error) {
        console.error('Error fetching user role:', error)
        setUserRole('user') // Default to user role if there's an error
      } finally {
        setLoading(false)
      }
    }

    if (isLoaded) {
      fetchUserRole()
    }
  }, [user, isLoaded])

  const hasRole = (role) => {
    if (!userRole) return false
    
    switch (role) {
      case 'admin':
        return userRole === 'admin'
      case 'seo':
        return userRole === 'seo' || userRole === 'admin'
      case 'user':
        return true
      default:
        return false
    }
  }

  const canAccessAdmin = () => hasRole('admin')
  const canAccessWrite = () => hasRole('seo') || hasRole('admin')

  return (
    <UserContext.Provider value={{
      user,
      userRole,
      loading: loading || !isLoaded,
      hasRole,
      canAccessAdmin,
      canAccessWrite
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}