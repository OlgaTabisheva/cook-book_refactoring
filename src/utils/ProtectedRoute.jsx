import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useAuthenticationStatus} from '@nhost/react'


export const ProtectedRoute = ({children}) => {
  const {isLoading, isAuthenticated} = useAuthenticationStatus()
  const location = useLocation()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{from: location}} replace/>
  }

  return <div>{children}</div>
}


export const PublicRoute = ({children}) => {
  const {isLoading, isAuthenticated} = useAuthenticationStatus()
  const location = useLocation()
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isAuthenticated) {
    return <Navigate to={'/user'} state={{from: location}} replace/>
  }

  return <div>{children}</div>
}


