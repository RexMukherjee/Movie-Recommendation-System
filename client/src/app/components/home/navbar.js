"use client";
import Image from "next/image";
import styles from "../../../styles/home/navbar/navbar.module.css";
import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [isManuallyLoggedIn, setIsManuallyLoggedIn] = useState(false);

  // 🔑 Search state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const manualLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsManuallyLoggedIn(manualLoginStatus);
  }, []);

  const handleProfileClick = async () => {
    if (session || isManuallyLoggedIn) {
      router.push("/components/profile");
    } else {
      router.push(`/components/login?callbackUrl=/components/profile`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // clear input after search
    }
  };

  const ProfileIcon = (
    <div className={styles.profile} onClick={handleProfileClick}>
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          width={32}
          height={32}
          alt="Profile"
          style={{ borderRadius: "50px", cursor: "pointer" }}
        />
      ) : (
        <CgProfile
          style={{
            width: "39px",
            height: "40px",
            cursor: "pointer",
            color: "rgb(213, 1, 255)",
          }}
        />
      )}
    </div>
  );

  return (
    <main className={styles.body}>
      {/* --------- Desktop Navbar --------- */}
      <nav className={styles.navbar}>
        <img src="/logo.png" alt="Obscura" className={styles.logo} />

        <ul className={styles.menu}>
          <li style={{ margin: "10px" }}>
            <Link href="/">Home</Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link href="/components/movies">Movies</Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link href="/components/favorites">Favorites</Link>
          </li>

          {/* 🔎 Search Form */}
          <form className={styles.searchdiv} onSubmit={handleSearch}>
            <input
              placeholder="Movies"
              className={styles.searchinput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className={styles.searchicon}>
              <LuSearch />
            </button>
          </form>

          {ProfileIcon}
        </ul>
      </nav>

      {/* --------- Mobile Navbar --------- */}
      <nav className={styles.navbar2}>
        <img src="/logo.png" alt="Obscura" className={styles.logo} />

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <RxCross2 style={{ marginBottom: "-5px" }} />
          ) : (
            <RxHamburgerMenu style={{ marginBottom: "-5px" }} />
          )}
        </button>

        <ul className={`${styles.menu1} ${menuOpen ? styles.open : ""}`}>
          <li style={{ margin: "10px" }}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link
              href="/components/movies"
              onClick={() => setMenuOpen(false)}
            >
              Movies
            </Link>
          </li>
          <li style={{ margin: "10px" }}>
            <Link
              href="/components/favorites"
              onClick={() => setMenuOpen(false)}
            >
              Favorites
            </Link>
          </li>

          {/* 🔎 Mobile Search Form */}
          <form className={styles.searchdiv} onSubmit={handleSearch}>
            <input
              placeholder="Movies"
              className={styles.searchinput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className={styles.searchicon}>
              <LuSearch />
            </button>
          </form>

          {ProfileIcon}
        </ul>
      </nav>
    </main>
  );
}
