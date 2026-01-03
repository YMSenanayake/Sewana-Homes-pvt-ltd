import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/features'
import NewArrivals from '../components/NewArrivals'
import PopularProducts from '../components/PopularProducts'
import Testimonial from '../components/Testimonial'

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <NewArrivals />
      <PopularProducts />
      <div className="hidden sm:block max-padd-container mt-28 bg-[url('/src/assets/banner.gif')] bg-cover bg-center bg-no-repeat h-[288px]" />
      {/* 🔥 New Video Banner */}
      {/* <div className="hidden sm:block max-padd-container mt-28 h-[350px] relative rounded-2xl overflow-hidden">
        <video
          src="/src/assets/bannerVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div> */}

      <Testimonial />
    </>
  )
}

export default Home
