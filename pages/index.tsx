import Header from "components/Header";
import PageHead from "components/PageHead";
import type { NextPage } from "next";
import { useEffect, useRef } from "react";
import styles from "styles/Index.module.scss";

const Index: NextPage = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      for (const card of gridRef.current.children) {
        if (card instanceof HTMLDivElement) {
          card.addEventListener("mousemove", (event) => {
            const rect = card.getBoundingClientRect();
            const x = (event as MouseEvent).clientX - rect.left;
            const y = (event as MouseEvent).clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          });
        }
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <PageHead></PageHead>

      <Header></Header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.blue}>KeySafe</span> - Your Password Manager
        </h1>

        <div className={styles.grid} ref={gridRef}>
          <div className={styles.card}>
            <h2>Encrypted</h2>
            <p>
              256-bit encryption used every step of the way ensures your
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
              Cloud architecture means there&apos;s no limit on your protection.
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
