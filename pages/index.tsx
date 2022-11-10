import type { NextPage } from "next";
import Link from "next/link";

import styles from "../styles/Index.module.scss";
import PageHead from "../components/PageHead";
import Header from "../components/Header";

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageHead></PageHead>

      <Header></Header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.blue}>KeySafe</span> - Your Password Manager
        </h1>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Encrypted</h2>
            <p>
              512-bit encryption used every step of the way ensures your
              security.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Open-Source</h2>
            <p>
              Nothing is being hidden, you can verify our security for yourself.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Unlimited</h2>
            <p>
              Cloud architecture means there&apos;s no limit on your protection
            </p>
          </div>

          <div className={styles.card}>
            <h2>Fast</h2>
            <p>Modern storage techniques make the service better to use.</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>&copy; Tiger Taylor 2022</footer>
    </div>
  );
};

export default Index;
