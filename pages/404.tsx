import {NextPage} from "next";
import PageHead from "../components/PageHead";
import Link from "next/link";

import styles from "../styles/Error.module.scss";

const Page404: NextPage = () => {
  return (
    <div className={styles.container}>
      <PageHead title="Page Not Found" desc="Page not found"></PageHead>
      <h1 className={styles.h1}>Error 404: Page Not Found</h1>
      <p className={styles.p}>Sorry, that page doesn't exist.</p>
      <Link href="/" className={styles.link}>Return Home</Link>
    </div>
  );
}

export default Page404
