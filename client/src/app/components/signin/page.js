"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const SignIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/"); 
    }
  }, [status, router]);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Welcome Back 🎬</h1>
        <p>Sign in to watch movies and leave reviews!</p>

        {status === "loading" ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={() => signIn("google")} 
            className={styles.signInButton}
          >
            Sign in with Google
          </button>
        )}

        <p className={styles.note}>Don't worry, no spam. Only popcorn 🍿</p>
      </div>
    </div>
  )
}

export default SignIn
