import {useRouter} from "next/router";
import {ReactNode, useEffect, useState} from "react";

interface Props {
  children?: any,
  protectedRoutes: string[]
}

const Authentication = ({ children, protectedRoutes}: Props) => {
  const router = useRouter()
  const [isAuthenticated, setAuthenticated] = useState(false)

  const isProtectedRoute: boolean = protectedRoutes.some((route: string) => router.pathname.includes(route))

  useEffect(() => {
    if (isProtectedRoute) {
      const token = localStorage.getItem("token")
      // TODO check if token is valid in database
      if (token === "fake-token") {
        setAuthenticated(true)
      } else {
        localStorage.removeItem("token")
        router.push("/login").then()
      }
    }
  })

  return children;
}
export default Authentication;