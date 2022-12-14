import Authentication from "components/Authentication";
import type { AppProps } from "next/app";
import "styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const protectedRoutes = ["/dashboard"];

  return (
    <div>
      <Authentication protectedRoutes={protectedRoutes}>
        <Component {...pageProps} />
      </Authentication>
    </div>
  );
}

export default MyApp;
