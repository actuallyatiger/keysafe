import type {NextPage} from 'next'

import styles from '../styles/Header.module.scss'
import Link from "next/link"

const Header: NextPage = () => {
  return (
    <header className={styles.header}>
    <h1 className={styles.headerHome}><Link href="/">KeySafe</Link></h1>
    <div className={styles.headerLinks}>
      <Link href="/login" className={styles.login}>Log in</Link>
      <Link href="/register" className={styles.register}>Register</Link>
    </div>
  </header>)
}


export default Header
