import React from 'react'
import styles from '../../../styles/home/footer/footer.module.css'
import Link from 'next/link'

const Footer = () => {
  return (
    <main className={styles.footer}>
      <div className={styles.img}>
      <img src='/logo.png' className={styles.logo}/>
      </div>
      <div className={styles.list}>
      <ul className={styles.ul}>
        <li><Link href="/" >About us</Link></li>
        <li><Link href="/">Contact Us</Link></li>
        <li><Link href="/">Policy</Link></li>
      </ul>
    </div>
    <p className={styles.para}>Obscura © 2025. All Rights Reserved. Built for film fans, by film fans.</p>
    </main>
  )
}

export default Footer
