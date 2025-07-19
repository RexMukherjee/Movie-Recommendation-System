import React from 'react'
import SingleMoviePage from './singlemoviedetails/singlemoviepage'
import Reviews from './singlemoviedetails/reviews'
import Navbar from '../../home/navbar'
import Footer from '../../home/footer'

const Page = () => {
  return (
    <div>
      <Navbar/>
      <SingleMoviePage/>
      <Footer/>
    </div>
  )
}

export default Page
