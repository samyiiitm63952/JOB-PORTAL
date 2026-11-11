import React, { useEffect } from 'react'
import Navbar from "./Navbar"
import Header from './Header'
import Categories from './Categories'
import LatestJobs from './LatestJobs'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs()
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'Recruiter') {
      navigate("/admin/companies")
    }
  }, [user, navigate])

  return (
    <div className='min-h-screen relative overflow-x-hidden bg-slate-50/40 bg-dot-pattern'>
      {/* Soft ambient background glows matching portal theme */}
      <div className='pointer-events-none absolute -top-20 -left-24 h-96 w-96 rounded-full bg-[#6B3AC2]/15 blur-3xl' />
      <div className='pointer-events-none absolute top-44 -right-24 h-96 w-96 rounded-full bg-[#FA4F09]/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-200/30 blur-3xl' />

      <div className='relative z-10'>
        <Navbar />
        <div className='px-4'>
          <Header />
          <Categories />
          <LatestJobs />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default Home
