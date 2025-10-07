"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "../../../../styles/profile/accountdetails/acountdetails.module.css";

const Accountdetails = () => {
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const userData = localStorage.getItem("user");
        
        console.log("isLoggedIn:", isLoggedIn);
        console.log("userData:", userData);

        // Check if user is logged in
        if (!isLoggedIn || isLoggedIn !== "true") {
          router.push("/components/login");
          return;
        }

        // Check if user data exists and is valid JSON
        if (!userData || userData.trim() === "" || userData === "undefined") {
          console.error("No user data found in localStorage");
          router.push("/components/login");
          return;
        }

        // Parse user data safely
        let parsedUser;
        try {
          parsedUser = JSON.parse(userData);
        } catch (parseError) {
          console.error("Error parsing user data:", parseError, "Data:", userData);
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          router.push("/components/login");
          return;
        }

        // Validate parsed user data
        if (!parsedUser || typeof parsedUser !== "object") {
          console.error("Invalid user data structure:", parsedUser);
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          router.push("/components/login");
          return;
        }

        setUser(parsedUser);
        setFormData({
          name: parsedUser.name || "",
          age: "",
          email: parsedUser.email || "",
          phone: parsedUser.phone || "",
        });

      } catch (error) {
        console.error("Authentication check error:", error);
        router.push("/components/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    setEditing(false);
  };

  const handleSignOut = () => {
    // Clear auth data
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    
    // Redirect to home
    router.push("/");
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <h2 className={styles.heading}>My Profile</h2>
        
        <div className={styles.profile}>
          <img
            src="/default-avatar.png"
            alt="Profile"
            className={styles.dp} 
          />
        </div>

        <div className={styles.details}>
          <p><strong>Name:</strong> {user.name || "Not Set"}</p>
          <p><strong>Age:</strong> {formData.age || "Not Set"}</p>
          <p><strong>Email:</strong> {user.email || "Not Set"}</p>
          <p><strong>Phone:</strong> {user.phone || "Not Set"}</p>
        </div>

        <button onClick={() => setEditing(true)} className={styles.changeBtn}>
          Change Details
        </button>

        <button onClick={handleSignOut} className={styles.signoutBtn}>
          Sign Out
        </button>

        {editing && (
          <div className={styles.popupOverlay}>
            <div className={styles.popup}>
              <h3>Update Info</h3>
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
              <div className={styles.popupBtns}>
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Accountdetails;