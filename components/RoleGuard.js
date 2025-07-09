// components/RoleGuard.js
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from '../context/UserContext'
import { SignInButton, useUser } from '@clerk/nextjs'

export function withRoleGuard(Component, requiredRole) {
  return function ProtectedComponent(props) {
    const router = useRouter()
    const { user } = useUser()
    const { userRole, loading, hasRole } = useUserContext()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
      if (!loading) {
        setChecking(false)
      }
    }, [loading])

    if (checking || loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      )
    }

    // If user is not signed in and role is required
    if (!user && requiredRole) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You need to sign in to access this page.</p>
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      )
    }

    // If user is signed in but doesn't have required role
    if (user && requiredRole && !hasRole(requiredRole)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="mb-4">You don't have permission to access this page.</p>
            <p className="text-sm text-gray-600">
              Required role: {requiredRole}. Your role: {userRole || 'none'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Go Home
            </button>
          </div>
        </div>
      )
    }

    return <Component {...props} />
  }
}

// For use in components
export function RoleGuard({ children, requiredRole, fallback }) {
  const { user } = useUser()
  const { userRole, loading, hasRole } = useUserContext()

  if (loading) {
    return fallback || <div>Loading...</div>
  }

  if (!user && requiredRole) {
    return fallback || (
      <div className="text-center">
        <p className="mb-4">You need to sign in to access this content.</p>
        <SignInButton mode="modal">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Sign In
          </button>
        </SignInButton>
      </div>
    )
  }

  if (user && requiredRole && !hasRole(requiredRole)) {
    return fallback || (
      <div className="text-center">
        <p>You don't have permission to access this content.</p>
      </div>
    )
  }

  return children
}