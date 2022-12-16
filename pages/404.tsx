import PageHead from "components/PageHead";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "styles/Error.module.scss";

const dashRoutes = ["dashboard", "account"];

const Page404: NextPage = () => {
  const [returnLink, setReturnLink] = useState<JSX.Element | null>(null);
  const router = useRouter();

  useEffect(() => {
    const route = router.asPath.split("/")[1];

    if (dashRoutes.includes(route)) {
      setReturnLink(
        <Link href="/dashboard" className={styles.link}>
          Return to Dashboard
        </Link>
      );
    } else {
      setReturnLink(
        <Link href="/" className={styles.link}>
          Return Home
        </Link>
      );
    }
  }, [router.asPath]);

  return (
    <div className={styles.container}>
      <PageHead title="Page Not Found" desc="Page not found"></PageHead>
      <h1 className={styles.h1}>Error 404: Page Not Found</h1>
      <p className={styles.p}>Sorry, that page doesn't exist.</p>
      {returnLink}
    </div>
  );
};

export default Page404;
