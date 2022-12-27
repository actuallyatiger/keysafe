import account from "assets/account.svg";
import logout from "assets/logout.svg";
import search from "assets/search.svg";
import PageHead from "components/PageHead";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  url?: string;
};

const Dashboard: NextPage = (...args: any) => {
  // Fetching credentials list
  const [data, setData] = useState<Credentials | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldUpdate, setShouldUpdate] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getCredentials = async () => {
      setData(null);
      try {
        // const res = await fetch("https://api.keysafe.info/getCredentials");
        // const data = await res.json();
        // Mock data
        const data = [
          {
            id: "1",
            name: "Google",
            email: "test1@example.com",
            url: "https://www.google.com",
          },
          {
            id: "2",
            name: "Facebook",
            email: "test2@example.com",
            url: "https://www.facebook.com",
          },
          {
            id: "3",
            name: "Twitter",
            email: "test3@example.com",
            url: "https://www.twitter.com",
          },
        ];
        setData(data);
        setError(null);
      } catch (e: any) {
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
              <h3>{item.name}</h3>
              {item.url && (
                <img
                  src={`${item.url}/favicon.ico`}
                  alt={`${item.name} logo`}
                  className={styles.credImg}
                />
              )}
              <p>{item.email}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  // Fetching selected credential details
  const router = useRouter();
  const { id } = router.query;
  const [cred, setCred] = useState<CredDetails | null>(null);
  const [credLoading, setCredLoading] = useState(false);
  const [credError, setCredError] = useState<Error | null>(null);

  useEffect(() => {
    setCredLoading(true);
    setCred(null);
    if (id === undefined) {
      setCredLoading(false);
      setCredError(null);
      setCred(null);
      return;
    }
    if (id === "new") {
      // TODO Create new credential
    }
    async function getCredential() {
      // TODO fetch credential
      // Mock data
      try {
        const data = {
          id: id as string,
          name: "Google",
          email: `test${id}@example.com`,
          password: "123",
          url: "https://www.google.com",
        };
        setCred(data);
        setCredError(null);
      } catch (e: any) {
        setCredError(e);
      }
      setCredLoading(false);
    }
    getCredential();
  }, [id]);

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
    if (cred === undefined || cred === null) {
      return (
        <div>
          No account selected.
          <br />
          Select one or create one.
        </div>
      );
    }
    return (
      <div className={styles.credContainer}>
        <div className={styles.credential}>
          {cred.url && (
            <img
              src={`${cred.url}/favicon.ico`}
              alt={`${cred.name} logo`}
              className={styles.credImg}
            />
          )}
          <h2 className={styles.name}>{cred.name}</h2>
          <div className={styles.spanDiv}>
            <span className={styles.urlSpan}>Website:</span>
            <span className={styles.emailSpan}>Email:</span>
            <span className={styles.pwordSpan}>Password:</span>
          </div>
          {cred.url && (
            <Link href={cred.url} className={styles.link}>
              {cred.url}
            </Link>
          )}
          <span className={styles.email}>{cred.email}</span>
          <span className={styles.pword}>{cred.password}</span>
        </div>
        <div className={styles.buttons}>
          <button className={styles.edit}>Edit details</button>
          <button className={styles.delete}>Delete</button>
        </div>
      </div>
    );
  };

  const logoutBtn = async () => {
    await fetch("https://api.keysafe.info/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    Router.push("/");
  };

  return (
    <div className={styles.container}>
      <PageHead title="Dashboard" desc="Dashboard" />
      <div>
        <header className={styles.header}>
          <div className={styles.search}>
            <input type="text" placeholder="Search by service name..." />
            <a onClick={() => setShouldUpdate(true)}>
              <Image src={search} alt="Search" width={24} height={24} />
            </a>
          </div>
          <div className={styles.headerButtons}>
            <Link href="/account">
              <Image src={account} alt="Account" width={40} height={40} />
            </Link>
            <a onClick={() => logoutBtn()}>
              <Image src={logout} alt="Account" width={40} height={40} />
            </a>
          </div>
        </header>
        <main className={styles.main}>
          <aside className={styles.sideBar}>
            {loadList(data)}
            <Link className={styles.new} href="new">
              + New
            </Link>
          </aside>
          <section className={styles.content}>{renderBody()}</section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
