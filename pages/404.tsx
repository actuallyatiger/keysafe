import {NextPage} from "next";
import PageHead from "../components/PageHead";
import Link from "next/link";

const Page404: NextPage = () => {
  return (
    <>
      <PageHead title="404" desc="Page not found"></PageHead>
      <h1>Error: 404</h1>
      <p>Page not found</p>
      <Link href="/">Return Home</Link>
    </>
  );
}

export default Page404;