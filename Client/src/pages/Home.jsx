import React from 'react'
import Navbar from '../components/NavBar';
import Hero from '../components/Hero';
import JobListing from '../components/JobListing';
import AppDownload from '../components/AppDownload';
import Footer from '../components/Footer';
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing />
      <AppDownload />
      <Footer />
    </div>
  )
}

export default Home;