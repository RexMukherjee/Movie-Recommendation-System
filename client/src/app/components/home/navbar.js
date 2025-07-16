import Image from "next/image";
import styles from "../../../styles/home/navbar/navbar.module.css"
import { LuSearch } from "react-icons/lu";
import Link from "next/link";
export default function Navbar() {
  return (
    <main>
      <nav className={styles.navbar}>
        <img src="/logo.jpeg" alt="" className={styles.logo} />
        
        <ul className={styles.menu}>
            <li style={{margin:"10px"}}><Link href="/" >Home</Link></li>
            <li style={{margin:"10px"}}><Link href="/components/movies">Movies</Link></li>
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
            <Link href="/components/profile"><img src="/profile.jpeg" alt="" className={styles.profile}/></Link>
        </ul>
      </nav>
    </main>
  );
}