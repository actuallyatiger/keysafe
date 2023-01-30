import Header from "components/Header";
import PageHead from "components/PageHead";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import styles from "styles/Login.module.scss";
import loading_circle from "assets/loading_circle.svg";

const Login: NextPage = () => {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Preemptively start API serverless container
    fetch("https://api.keysafe.info/");
    // Login validation done by /dashboard route
    if (localStorage.getItem("token") !== null) {
      setShouldRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/dashboard").then();
    }
  }, [shouldRedirect]);

  const loadingRef = useRef<HTMLImageElement>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    loadingRef.current!.style.display = "block";

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const jsonData = JSON.stringify(data);

    const endpoint = "https://api.keysafe.info/auth/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const req = await fetch(endpoint, options);

    if (req.status === 200) {
      const res = await req.json();
      localStorage.setItem("token", res.token);
      setShouldRedirect(true);
    } else {
      ReactDOM.render(
        <p>
          {(req.status ? "Error " + req.status + ": " : "") +
            "Try again later."}
        </p>,
        document.getElementById("error")
      );
    }
    try {
      loadingRef.current!.style.display = "none";
    } catch (e) {
      // Do nothing, null due to page having redirected.
    }
  };

  return (
    <>
      <div className={styles.container}>
        <PageHead title="Login" desc="Login to KeySafe"></PageHead>
        <Header />

        <main className={styles.main}>
          <div className={styles.loginBox}>
            <h1 className={styles.title}>Login</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="username" hidden>
                Username
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              <label htmlFor="password" hidden>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <Link href="/forgot-password" className={styles.resetPword}>
                Forgot password?
              </Link>
              <div className={styles.submitArea}>
                <button type="submit" id="submit " className={styles.submit}>
                  Login
                </button>
                <Image
                  src={loading_circle}
                  ref={loadingRef}
                  className={styles.loading_circle}
                  alt="Loading"
                  width={30}
                  height={30}
                />
              </div>
            </form>

            <p>
              Don't have an account?{" "}
              <Link href={"/register"} className={styles.registerLink}>
                Sign up
              </Link>
            </p>
          </div>
          <div id="error" className={styles.error}></div>
        </main>
      </div>
    </>
  );
};

export default Login;
