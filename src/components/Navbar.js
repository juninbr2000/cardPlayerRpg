import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css"
import { useAuthValue } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'

const Navbar = () => {

    const { user } = useAuthValue()
    const {logout} = useAuthentication()
    console.log(user)

  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
            <span>Hero</span>Note
        </NavLink>
        <div>
            <ul className={styles.link_list}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
                </li>
                
                {user && (
                    <>
                    <li>
                        <NavLink to="/View" className={({isActive}) => (isActive ? styles.active : "")}>Personagem</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Create" className={({isActive}) => (isActive ? styles.active : "")}>Criar</NavLink>
                    </li>
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                    </>
                )}
                {!user && (
                    <>
                        <li>
                            <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : "")}>Entrar</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : "")}>Cadastrar</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>

    </nav>
  )
}

export default Navbar