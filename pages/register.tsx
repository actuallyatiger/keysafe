import Header from "components/Header";
import PageHead from "components/PageHead";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "styles/Register.module.scss";

const Register: NextPage = () => {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    // Preemptively start API serverless container
    fetch("https://api.keysafe.info/");
    // Check if already logged in
    // TODO - check if token is valid
    if (localStorage.getItem("token") !== null) {
      setShouldRedirect(true);
    }
  }, []);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/dashboard").then();
    }
  }, [shouldRedirect]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const jsonData = JSON.stringify(data);

    const endpoint = "https://api.keysafe.info/auth/register";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const req = await fetch(endpoint, options);

    if (req.status === 201) {
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
  };

  return (
    <>
      <div className={styles.container}>
        <PageHead title="Register" desc="Register with KeySafe"></PageHead>
        <Header></Header>

        <main className={styles.main}>
          <div className={styles.registerBox}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="name" hidden>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
              <label htmlFor="username" hidden>
                Username
              </label>
              <input
                type="text"
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
              <button type="submit" className={styles.submit}>
                Register
              </button>
            </form>
            <p>
              Already got an account?{" "}
              <Link href="/login" className={styles.loginLink}>
                Sign in
              </Link>
            </p>
          </div>
          <div id="error" className={styles.error}></div>
        </main>
      </div>
    </>
  );
};

export default Register;
