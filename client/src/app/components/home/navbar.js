"use client";
import Image from "next/image";
import styles from "../../../styles/home/navbar/navbar.module.css"
import React, {useState, useEffect} from "react";
import { LuSearch } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useSession,signup } from "next-auth/react";
 import { useRouter } from "next/navigation"; // usePathname,


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLinkClick = () => setMenuOpen(false);
  const { data: session } = useSession();
  const router = useRouter();
  // const pathname = usePathname();
  const [isManuallyLoggedIn, setIsManuallyLoggedIn] = useState(false);
  useEffect(() => {
    const manualLoginStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsManuallyLoggedIn(manualLoginStatus);
  }, []);

  const handleProfileClick = async() => {
    if (session || isManuallyLoggedIn) {
      router.push("/components/profile");
    } else {
      router.push(`/components/login?callbackUrl=/components/profile`);
    }
  }
  const ProfileIcon = (
    <div className={styles.profile} onClick={handleProfileClick}>
      {session?.user?.image ? (
        <Image
          src={session.user.image}
          width={32}
          height={32}
          alt="Profile"style={{borderRadius: "50px",cursor:"pointer"}}
        />
      ) : (
        <CgProfile style={{ width: "39px", height: "40px", cursor: "pointer", color:"rgb(213, 1, 255)"}} />
         
      )}
    </div>
  );  
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
             {/* <Link href={session?.user ? "/components/profile" : "/components/signin"}>
             {/*<div className={styles.profile}>
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                   {/* <CgProfile style={{width: "39px", height: "40px"}}/>
                </div>*/}
                {/* {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  width={32}
                  height={32}
                  alt="Profile"
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <div className={styles.profile}>
                  <CgProfile style={{ width: "39px", height: "40px" }} />
                </div>
              )}
              </Link>   */}
              {ProfileIcon}
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
            {/* <Link href="/components/profile"><div className={styles.profile}> */}
                    {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                    {/* <CgProfile style={{width: "39px", height: "40px"}}/>
                </div></Link> */}
                {ProfileIcon}
        </ul>
      </nav>
    </main>
  );
}


