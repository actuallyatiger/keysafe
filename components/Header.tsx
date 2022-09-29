import type {NextPage} from 'next'

import styles from '../styles/Header.module.scss'
import Link from "next/link"

const Header: NextPage = () => {
  return (
    <header className={styles.header}>
    <h1 className={styles.headerHome}><Link href="/">KeySafe</Link></h1>
    <div className={styles.headerLinks}>
      <Link href="/login"><a className={styles.login}>Log in</a></Link>
      <Link href="/register"><a className={styles.register}>Register</a></Link>
    </div>
  </header>)
}


export default Header