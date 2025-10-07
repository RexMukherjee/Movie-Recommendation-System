"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { loginUser } from "@/lib/api";
import styles from "../../../styles/login/login.module.css"; 

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false); // ← Add loading state


  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      router.push(callbackUrl || "/components/profile");
    }
  }, [router, callbackUrl]);

  if (!isClient) {
    return <div>Loading...</div>; // Or skeleton screen
  }   
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(""); 
    setLoading(true); // ← Start loading


    try {
       // ✅ Use the imported function from api.js
      

      const data = await loginUser({ email, password });

    if (data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      router.push(callbackUrl || "/components/profile");
    } else {
      setErrorMsg(data.message || "Login failed. Please check your credentials.");
    }
  } catch (error) {
    setErrorMsg("Cannot connect to server. Please make sure the backend is running.");
    console.error("Login error:", error);
  } finally {
    setLoading(false);
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
          suppressHydrationWarning // ← Fixes hydration error
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.inputField}
          suppressHydrationWarning // ← Fixes hydration error
        />

        <button 
        type="submit"
         className={styles.submitBtn}
         disabled={loading} // ← Disable when loading
         >
          {loading ? "Signing In..." : "Sign In"}
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