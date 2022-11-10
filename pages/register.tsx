import type { NextPage } from "next";

import styles from "../styles/Register.module.scss";
import PageHead from "../components/PageHead";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Header from "../components/Header";

const Register: NextPage = () => {
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
      name: event.target.name.value,
      username: event.target.username.value,
      password: event.target.password.value,
    };

    const jsonData = JSON.stringify(data);

    const endpoint = "/api/register";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    const req = await fetch(endpoint, options);
    const res = await req.json();

    if (req.status === 201) {
      localStorage.setItem("token", res.token);
      setShouldRedirect(true);
    } else {
      ReactDOM.render(<>{res.error}</>, document.getElementById("error"));
    }
  };

  return (
    <>
      <div className={styles.container}>
        <PageHead title="Register" desc="Register with KeySafe"></PageHead>

        <Header></Header>

        <main>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" id="name" name="name" required />
            <br />
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" required />
            <br />
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" required />
            <br />
            <button type="submit">Register</button>
          </form>

          <div id="error" className={styles.error}></div>
        </main>
      </div>
      <Script id="hideError" strategy="afterInteractive">
        {`document.getElementById("error").style.display = "none";`}
      </Script>
    </>
  );
};

export default Register;
