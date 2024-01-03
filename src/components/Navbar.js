import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
            O Misterio de <span>Kielmore</span>
        </NavLink>
        <div>
            <ul className={styles.link_list}>
                <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/View" className={({isActive}) => (isActive ? styles.active : "")}>Personagem</NavLink>
                </li>
                <li>
                    <NavLink to="/Create" className={({isActive}) => (isActive ? styles.active : "")}>Criar</NavLink>
                </li>
            </ul>
        </div>

    </nav>
  )
}

export default Navbar