"use client";
import Image from "next/image";
import styles from "../../../styles/home/navbar/navbar.module.css"
import React, {useState} from "react";
import { LuSearch } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

import Link from "next/link";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLinkClick = () => setMenuOpen(false);

  return (
    <main className={styles.body}>
      <nav className={styles.navbar}>
        <img src="/logo.png" alt="Obscura" className={styles.logo} />
        
        <ul className={styles.menu} >
            <li style={{margin:"10px"}}><Link href="/" >Home</Link></li>
            <li style={{margin:"10px"}}><Link href="/components/movies" >Movies</Link></li>
            <li style={{margin:"10px"}}><Link href="/components/favorites">Favorites</Link></li>
            <form className={styles.searchdiv}>
                {/* <input type="text" placeholder="Movie Name" className={styles.search}/>
                <button type="submit" style={{borderRadius:"50px"}}>Search</button> */}
                <input placeholder="Movies" className={styles.searchinput}/>
                <div className={styles.searchicon}>
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    <LuSearch/>
                </div>
            </form>
            <Link href="/components/profile"><div className={styles.profile}>
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    <CgProfile style={{width: "39px", height: "40px"}}/>
                </div></Link>
        </ul>
      </nav>
      <nav className={styles.navbar2}>
        <img src="/logo.png" alt="Obscura" className={styles.logo} />

        <button className={styles.hamburger} onClick={()=> setMenuOpen(!menuOpen)}>
           {menuOpen ? (<RxCross2 style={{marginBottom: "-5px" }} />) : (<RxHamburgerMenu style={{marginBottom: "-5px"}} />)}
        </button>
        
        <ul className={`${styles.menu1} ${menuOpen ? styles.open : ''}`} >
            <li style={{margin:"10px"}}><Link href="/" onClick={()=> setMenuOpen(false)}>Home</Link></li>
            <li style={{margin:"10px"}}><Link href="/components/movies" onClick={()=> setMenuOpen(false)}>Movies</Link></li>
            <li style={{margin:"10px"}}><Link href="/components/favorites" onClick={()=> setMenuOpen(false)}>Favorites</Link></li>
            <form className={styles.searchdiv}>
                {/* <input type="text" placeholder="Movie Name" className={styles.search}/>
                <button type="submit" style={{borderRadius:"50px"}}>Search</button> */}
                <input placeholder="Movies" className={styles.searchinput}/>
                <div className={styles.searchicon}>
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    <LuSearch/>
                </div>
            </form>
            <Link href="/components/profile"><div className={styles.profile}>
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    <CgProfile style={{width: "39px", height: "40px"}}/>
                </div></Link>
        </ul>
      </nav>
    </main>
  );
}

