import React from 'react'
import { useAuth } from '../../context/AuthContext'

function NavBar() {

  const {user} = useAuth()
  return (
    <nav>
      {user ? (
        <div>
          
        </div>
      ): ()}
    </nav>
  )
}

export default NavBar