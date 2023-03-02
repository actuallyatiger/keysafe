import account from "assets/account.svg";
import logout from "assets/logout.svg";
import search from "assets/search.svg";
import copy from "assets/copy.svg";
import eye_open from "assets/eye-open.svg";
import eye_closed from "assets/eye-closed.svg";
import { apiFetch, apiFetchBody } from "components/FetchHandler";
import PageHead from "components/PageHead";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "styles/Dashboard.module.scss";

type Credentials = CredSummary[] | null;

type CredSummary = {
  id: string;
  name: string;
  email: string;
  url?: string;
};

type CredDetails = {
  id: string;
  name: string;
  email: string;
  password: string;
  url: string;
};

const emptyState: CredDetails = {
  id: "",
  name: "",
  email: "",
  password: "",
  url: "",
};

const Dashboard: NextPage = (...args: any) => {
  // Fetching credentials list
  const [data, setData] = useState<Credentials | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getCredentials = async () => {
      setData(null);
      const searchTerm = searchRef.current!.value;
      let res;
      try {
        if (searchTerm.length > 0) {
          res = await apiFetch(`/creds/getCredentials?search=${searchTerm}`);
        } else {
          res = await apiFetch("/creds/getCredentials");
        }
        setData(res["creds"]);
        setError(null);
      } catch (e: any) {
        if (e.message === "Unauthorized") {
          Router.push("/login");
        }
        setError(e);
      }
      setLoading(false);
      setShouldUpdate(false);
    };
    if (shouldUpdate) {
      setLoading(true);
      getCredentials();
    }
  }, [shouldUpdate]);

  const loadList = (data: Credentials | null) => {
    if (loading) {
      return <div className={styles.loading}>Loading...</div>;
    }
    if (error) {
      return (
        <div className={styles.error}>
          Error loading accounts.
          <br />({error.message})
        </div>
      );
    }
    if (data === null || data.length === 0) {
      return (
        <div className={styles.noData}>
          No accounts found.
          <br />
          Create one below.
        </div>
      );
    }
    return (
      <ul className={styles.sideList}>
        {data.map((item: CredSummary) => (
          <li key={item.id} className={styles.listItem}>
            <Link href={`/dashboard/${item.id}`}>
              <h3>{item.name || "Unnamed"}</h3>
              {item.url && (
                <img
                  src={`https://icon.horse/icon/${item.url
                    .replace("https://", "")
                    .replace("http://", "")}`}
                  alt={`${item.name} logo`}
                  className={styles.credImg}
                />
              )}
              <p>{item.email || "No email"}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  // Fetching selected credential details
  const router = useRouter();
  const { id } = router.query;
  const [cred, setCred] = useState<CredDetails>(emptyState);
  const [credLoading, setCredLoading] = useState(false);
  const [credError, setCredError] = useState<Error | null>(null);

  useEffect(() => {
    setCredLoading(true);
    setCred(emptyState);
    if (id === undefined) {
      setCredLoading(false);
      setCredError(null);
      return;
    }

    async function getCredential() {
      try {
        const data = await apiFetch(`/creds/getCredential/${id}`);
        setCred(data["cred"]);
        setCredError(null);
      } catch (e: any) {
        if (e.message === "Unauthorized") {
          Router.push("/login");
        }
        setCredError(e);
      }
      setCredLoading(false);
    }
    getCredential();
  }, [id]);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let toSend: CredDetails = { ...cred };
    Object.keys(toSend).forEach((key) => {
      toSend[key as keyof CredDetails] =
        toSend[key as keyof CredDetails].trim();
    });
    async function setCredential() {
      await apiFetchBody(`/creds/setCredential/${id}`, "PUT", toSend);
    }
    setCredential().then(() => {
      // Inside then() to ensure the request is finished before updating.
      setShouldUpdate(true);
      setCred(toSend);
    });
  };

  const formChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCred({ ...cred, [e.currentTarget.name]: e.currentTarget.value });
  };

  const openRef = useRef<HTMLImageElement>(null);
  const closedRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLImageElement>(null);

  const pwordRef = useRef<HTMLInputElement>(null);

  const eyeChange = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget === openRef.current) {
      openRef.current!.style.display = "none";
      closedRef.current!.style.display = "inline";
      pwordRef.current!.type = "password";
    } else if (e.currentTarget === closedRef.current) {
      closedRef.current!.style.display = "none";
      openRef.current!.style.display = "inline";
      pwordRef.current!.type = "text";
    }
  };

  const copyPword = () => {
    navigator.clipboard.writeText(
      (document.getElementById("password") as HTMLInputElement).value
    );
  };

  const renderBody = () => {
    if (credLoading) {
      return <div className={styles.loading}>Loading...</div>;
    }
    if (credError) {
      return (
        <div className={styles.error}>
          Error loading account.
          <br />({credError.message})
        </div>
      );
    }
    if (id === undefined) {
      return (
        <div>
          No account selected.
          <br />
          Select one or create one.
        </div>
      );
    }
    return (
      <form
        className={styles.credContainer}
        onSubmit={formSubmit}
        autoComplete="off"
      >
        <div className={styles.credential}>
          {cred.url && (
            <img
              src={`https://icon.horse/icon/${cred.url
                .replace("https://", "")
                .replace("http://", "")}`}
              alt={`${cred.name} logo`}
              className={styles.credImg}
            />
          )}
          <input
            name="name"
            type="text"
            className={styles.name}
            value={cred.name}
            placeholder="Name"
            onChange={(e) => formChange(e)}
          ></input>
          <div className={styles.spanDiv}>
            <span className={styles.urlSpan}>Website:</span>
            <span className={styles.emailSpan}>Email:</span>
            <span className={styles.pwordSpan}>Password:</span>
          </div>
          <input
            name="url"
            type="url"
            value={cred.url}
            className={styles.link}
            placeholder="Website"
            onChange={(e) => formChange(e)}
          ></input>
          <input
            name="email"
            type="text"
            className={styles.email}
            value={cred.email}
            placeholder="Email"
            onChange={(e) => formChange(e)}
          ></input>
          <span className={styles.pword}>
            <input
              name="password"
              id="password"
              type="password"
              autoComplete="new-password"
              className={styles.pwordInput}
              value={cred.password}
              placeholder="Password"
              ref={pwordRef}
              onChange={(e) => formChange(e)}
            ></input>
            <Image
              src={eye_closed}
              alt="Hide password"
              height={25}
              width={25}
              ref={openRef}
              style={{ display: "none" }}
              onClick={(e) => eyeChange(e)}
            ></Image>
            <Image
              src={eye_open}
              alt="Reveal password"
              height={25}
              width={25}
              ref={closedRef}
              onClick={(e) => eyeChange(e)}
            ></Image>
            <Image
              src={copy}
              alt="Copy"
              height={25}
              width={25}
              ref={copyRef}
              onClick={() => copyPword()}
            ></Image>
          </span>
        </div>
        <div className={styles.buttons}>
          <button type="submit" className={styles.edit}>
            Save Changes
          </button>
          <button className={styles.delete} onClick={() => deleteBtn()}>
            Delete
          </button>
        </div>
      </form>
    );
  };

  const deleteBtn = async () => {
    if (id === undefined || id === null) {
      return;
    } else {
      await apiFetch(`/creds/deleteCredential/${id}`, "DELETE");
      router.push("/dashboard");
    }
  };

  const newBtn = async () => {
    const data = await apiFetch("/creds/createCredential", "POST");
    searchRef.current!.value = "";
    setShouldUpdate(true);
    Router.push(`/dashboard/${data["id"]}`);
  };

  const logoutBtn = async () => {
    await fetch("https://api.keysafe.info/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token") || "",
      },
    });
    localStorage.removeItem("token");
    Router.push("/");
  };

  useEffect(() => {
    searchRef.current!.addEventListener("keyup", ({ key }) => {
      if (key === "Enter") {
        setShouldUpdate(true);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <PageHead title="Dashboard" desc="Dashboard" />
      <div>
        <header className={styles.header}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search by service name..."
              ref={searchRef}
            />
            <a onClick={() => setShouldUpdate(true)}>
              <Image src={search} alt="Search" width={24} height={24} />
            </a>
          </div>
          <div className={styles.headerButtons}>
            <Link href="/account">
              <Image src={account} alt="Account" width={40} height={40} />
            </Link>
            <a onClick={() => logoutBtn()}>
              <Image src={logout} alt="Logout" width={40} height={40} />
            </a>
          </div>
        </header>
        <main className={styles.main}>
          <aside className={styles.sideBar}>
            {loadList(data)}
            <button className={styles.new} onClick={() => newBtn()}>
              + New
            </button>
          </aside>
          <section className={styles.content}>{renderBody()}</section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
