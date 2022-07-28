import '../styles/globals.scss'
import type {AppProps} from 'next/app'

import Authentication from "../components/Authentication";

function MyApp({Component, pageProps}: AppProps) {
  const protectedRoutes = ["/dashboard"]

  return (<>
    <Authentication protectedRoutes={protectedRoutes}>
      <Component {...pageProps} />
    </Authentication>
  </>)
}

export default MyApp
