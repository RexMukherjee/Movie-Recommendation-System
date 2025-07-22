"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import styles from "../../../styles/login/login.module.css"; 

const SignUpPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!form.name || !form.email || !form.password) {
        setError("All fields are required.");
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (data.success) {
            setSuccessMsg("Sign-up successful! Redirecting to login...");
            setTimeout(() => {
                router.push("/components/login");
            }, 2000);
        } else {
            setError(data.message || "Sign-up failed.");
        }
    } catch (error) {
        setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form className={styles.authForm} onSubmit={handleSignUp}>
        <h2>Create Account</h2>

        {error && <p className={styles.error}>{error}</p>}
        {successMsg && <p className={styles.success}>{successMsg}</p>} 

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitBtn}>Sign Up</button>
        <p className={styles.or}>— or —</p>
        <button
          type="button"
          className={styles.googleBtn}
          onClick={() => signIn('google', { callbackUrl: '/components/profile' })}
        >
          Sign up with Google
        </button>
        
        <p className={styles.redirectLink}>
          Already have an account? <Link href="/components/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;