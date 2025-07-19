"use client"
import { SessionProvider } from 'next-auth/react'
import { FavoritesProvider } from './FavoritesContext'

const Providers = ({children}) => {
  return (
    <SessionProvider>
     <FavoritesProvider>{children}</FavoritesProvider>   
     </SessionProvider>
  )
}

export default Providers
