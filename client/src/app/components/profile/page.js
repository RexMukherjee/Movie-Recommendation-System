"use client";
import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Accountdetails from './userdetails/accountdetails';
import Watchhistory from './userdetails/watchhistory';
import Navbar from '../home/navbar';
import Footer from '../home/footer';
const Profile = () => {
    const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/components/login");
    }
  }, [router]);

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
