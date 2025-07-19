"use client";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import styles from "../../../../styles/profile/accountdetails/acountdetails.module.css";
import { useRouter } from "next/navigation";

const Accountdetails = () => {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    age: "",
    email: session?.user?.email || "",
    phone: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    
    // console.log("Updated Data:", formData);
    setEditing(false);
  };
  const handleSubmit = (e) => {
     e.preventDefault();
    // console.log("Updated Details:", formData);
    setEditing(false);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false }); 
    router.push("/"); 
  };
  return (
   <main className={styles.body}>
    <div className={styles.container}>
      <h2 className={styles.heading}>My Profile</h2>
      
      <div className={styles.profile}>
        <img
          src={session?.user?.image}
          alt="Profile"
          className={styles.dp} 
        />
        <input type="file" className={styles.fileInput} />
      </div>

      <div className={styles.details}>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Age:</strong> {formData.age || "Not Set"}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone || "Not Set"}</p>
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
  )
}

export default Accountdetails
