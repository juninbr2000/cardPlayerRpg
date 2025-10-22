
import { useAuth } from '../../context/AuthContext'
import Button from '../Utils/Button'
import styles from './Navbar.module.css'
import { FaRegCircleUser } from 'react-icons/fa6'
import { FaRegBell } from 'react-icons/fa'
import { IoIosLogOut } from 'react-icons/io'

function NavBar() {

  const {user, logout} = useAuth()

  return (
    <nav className={styles.container}>
      {user ? (
        <>
          <div className={styles.user}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className={styles.picture} />
            ): (
              <FaRegCircleUser />
            )}
            <p className={styles.name}>{user.displayName}</p>
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.notify}><FaRegBell /></button>
            <Button title='Sair' icon={<IoIosLogOut />} action={logout} variant='secondary' />
          </div>
        </>
      ): (
        <div>

        </div>
      )}
    </nav>
  )
}

export default NavBar