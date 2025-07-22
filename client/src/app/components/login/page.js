"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import styles from "../../../styles/login/login.module.css"; 

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push(callbackUrl || "/components/profile");
    }
  }, [router, callbackUrl]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); 

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        
        router.push(callbackUrl || "/components/profile");
      } else {
        setErrorMsg(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleLogin}>
        <h2>Sign In</h2>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.inputField}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
        />

        <button type="submit" className={styles.submitBtn}>
          Sign In
        </button>

        <p className={styles.or}>— or —</p>

        <button
          type="button"
          className={styles.googleBtn}
           onClick={() => signIn('google', { callbackUrl: callbackUrl || '/components/profile' })}
        >
          Sign in with Google
        </button>

        <p className={styles.redirectLink}>
          Don’t have an account? <Link href="/components/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;