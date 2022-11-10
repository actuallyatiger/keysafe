import { NextPage, NextPageContext } from "next";
import PageHead from "../components/PageHead";
import Link from "next/link";

import styles from "../styles/Error.module.scss";

interface Props {
  statusCode: number | undefined;
}

const ErrorPage: NextPage<Props> = ({ statusCode }) => {
  return (
    <>
      <PageHead
        title={`Error ${statusCode}`}
        desc={`Error ${statusCode}`}
      ></PageHead>
      <div className={styles.container}>
        <h1 className={styles.h1}>Error {statusCode}</h1>
        <p>
          {statusCode
            ? `An error ${statusCode} occurred on the server`
            : "An error occurred on the client"}
          . Please try again later.
        </p>
        <Link href="/" className={styles.link}>
          Return Home
        </Link>
      </div>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
