import React from 'react'
import styles from "../../../styles/home/about/about.module.css"
import Link from 'next/link'
const About = () => {
  return (
    <main className={styles.body}>
        <h1 className={styles.heading}>About Obscura</h1>
        <div className={styles.aboutpara}><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel necessitatibus nisi laboriosam nam cupiditate facere, praesentium id atque unde sunt debitis dignissimos, esse exercitationem eaque qui. Odio enim unde dolores.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe alias optio porro id tempora sint similique tempore incidunt. Omnis consequatur velit delectus, quasi voluptas eum similique eos perferendis corrupti rem?</p>
        <img src="/anyimg.jpeg" alt="" className={styles.img}/></div>
        <button><Link href="/components/movies">Explore more</Link></button>
    </main>
  )
}

export default About
