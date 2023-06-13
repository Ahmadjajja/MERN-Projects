import React from 'react'
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import LandingPage from './LandingPage';
function index() {
  return (
    <div className='d-flex flex-column'>
      <Header />
      <main>
        <LandingPage />
      </main>
      <div className='mt-auto'><Footer /></div>
      
      </div>
  )
}

export default index