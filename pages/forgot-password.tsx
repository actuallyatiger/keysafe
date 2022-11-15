import Header from "components/Header";
import PageHead from "components/PageHead";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "styles/Forgot-Password.module.scss";

const ForgotPassword: NextPage = () => {
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      router.push("/dashboard").then();
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
      email: event.target.email.value,
    };

    const jsonData = JSON.stringify(data);

    const endpoint = "/api/auth/forgot-password";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const req = await fetch(endpoint, options);

    if (req.status === 200) {
      ReactDOM.render(
        <p>
          Email sent.{" "}
          <Link href="/login" className="">
            Return to login
          </Link>
        </p>,
        document.getElementById("success")
      );
    } else {
      console.log(document.getElementById("error"));
      ReactDOM.render(
        <p>
          {(req.status ? "Error " + req.status + ": " : "") +
            "Server did not respond. Try again later."}
        </p>,
        document.getElementById("error")
      );
    }
  };

  return (
    <>
      <div className={styles.container}>
        <PageHead title="Forgot Password" desc="Reset password" />
        <Header />
        <main className={styles.main}>
          <div className={styles.forgotPasswordBox}>
            <h1 className={styles.title}>Forgot Password</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label htmlFor="email" hidden>
                Emai
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
              <button type="submit" className={styles.submit}>
                Send Reset Email
              </button>
            </form>
          </div>
          <div id="success" className={styles.success}></div>
          <div id="error" className={styles.error}></div>
        </main>
      </div>
    </>
  );
};

export default ForgotPassword;
