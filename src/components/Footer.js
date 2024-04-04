import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>

        <p>O Misterio de Kielmore© 2024</p>

        <p>created by: <Link to="https://github.com/juninbr2000">Edson_Jr.</Link></p>
        
    </footer>
  )
}

export default Footer