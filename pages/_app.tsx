import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import Authentication from "../components/Authentication";

import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({ subsets: ["latin-ext"] });

function MyApp({Component, pageProps}: AppProps) {
  const protectedRoutes = ["/dashboard"]

  return (<div className={montserrat.className}>
    <Authentication protectedRoutes={protectedRoutes}>
      <Component {...pageProps} />
    </Authentication>
  </div>)
}

export default MyApp
