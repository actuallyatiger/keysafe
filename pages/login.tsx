import {NextPage} from 'next'
import * as ReactDOM from "react-dom"

import styles from '../styles/Login.module.scss'
import PageHead from '../components/PageHead'
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import Header from "../components/Header"

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

      <Header></Header>

      <main className={styles.main}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
              <input type="text" id="username" name="username" placeholder="Username" required /><br />
              <input type="password" id="password" name="password" placeholder="Password" required /><br />
            <button type="submit" className={styles.submit}>Login</button>
          </form>
        </div>
        <div id="error" className={styles.error}></div>
      </main>

    </div>
  </>)
}

export default Login
