import Header from "components/Header";
import PageHead from "components/PageHead";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styles from "styles/Login.module.scss";
import loading_circle from "assets/loading_circle.svg";

const Login: NextPage = () => {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Preemptively start API serverless container
    fetch("https://api.keysafe.tigertaylor.xyz/");
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

  const sumbitRef = useRef<HTMLButtonElement>(null);
  const loadingRef = useRef<HTMLImageElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    sumbitRef.current!.setAttribute("disabled", "true");
    loadingRef.current!.style.display = "block";
    sumbitRef.current!.style.cursor = "wait";

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const jsonData = JSON.stringify(data);

    const endpoint = "https://api.keysafe.tigertaylor.xyz/auth/login";

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
      errorRef.current!.textContent = req.status
        ? `Error ${req.status}: ${(await req.json())["error"]}`
        : "Try again later.";
    }

    try {
      sumbitRef.current!.removeAttribute("disabled");
      loadingRef.current!.style.display = "none";
      sumbitRef.current!.style.cursor = "pointer";
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
                autoComplete="email"
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
                autoComplete="current-password"
                placeholder="Password"
                required
              />
              <Link href="/forgot-password" className={styles.resetPword}>
                Forgot password?
              </Link>
              <div className={styles.submitArea}>
                <button
                  type="submit"
                  id="submit"
                  className={styles.submit}
                  ref={sumbitRef}
                >
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
          <div id="error" className={styles.error} ref={errorRef}></div>
        </main>
      </div>
    </>
  );
};

export default Login;
