import {NextPage} from 'next'
import * as ReactDOM from "react-dom"

import styles from '../styles/Login.module.scss'
import PageHead from '../components/PageHead'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

const Login: NextPage = () => {

  const router = useRouter()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      router.push("/dashboard").then()
    }
  }, [])

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/dashboard").then()
    }
  }, [shouldRedirect])

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    const jsonData = JSON.stringify(data)

    const endpoint = "/api/login"

    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    }

    const req = await fetch(endpoint, options)
    const res = await req.json()

    if (req.status === 200) {
      localStorage.setItem("token", res.token)
      setShouldRedirect(true)
    } else {
      ReactDOM.render(<>{res.error}</>, document.getElementById("error"))
    }
  }

  return (<>
      <div className={styles.container}>
        <PageHead title="Login" desc="Login to KeySafe"></PageHead>

        <main>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" required/><br/>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" required/><br/>
            <button type="submit">Login</button>
          </form>

          <div id="error" className={styles.error}></div>
        </main>
      </div>
    </>
  )
}

export default Login