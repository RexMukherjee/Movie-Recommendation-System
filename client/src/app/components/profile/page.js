import React from 'react'
import Accountdetails from './userdetails/accountdetails'
import Watchhistory from './userdetails/watchhistory'
import Navbar from '../home/navbar'
import Footer from '../home/footer'
const Profile = () => {
  return (
    <main>
        <Navbar/>
        <Accountdetails/>
        <Watchhistory/>
        <Footer/>
    </main>
  )
}

export default Profile
