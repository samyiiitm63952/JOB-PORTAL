import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy.jsx'
import TermsofService from './components/components_lite/TermsofService.jsx'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'
import Profile from './components/components_lite/Profile'
import Details from './components/components_lite/Details'
import Companies from './components/admincomponents/Companies'
import CompanyCreate from './components/admincomponents/CompanyCreate'
import CompanySetup from './components/admincomponents/CompanySetup'
import AdminJobs from './components/admincomponents/AdminJobs.jsx'
import PostJob from './components/admincomponents/PostJob'
import Applicants from './components/admincomponents/Applicants'

const appRoute = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/PrivacyPolicy",
    element: <PrivacyPolicy />
  },
  {
    path: "/TermsofService",
    element: <TermsofService />
  },
  {
    path:"/jobs",
    element:<Jobs/>
  },{
    path:'/Browse',
    element:<Browse/>
  },{
    path:'/Profile',
    element:<Profile/>
  },{
    path:'/Details/:id',
    element:<Details/>
  },

  //admin routes
  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/companies/create",
    element:<CompanyCreate/>
  },
  {
    path:"/admin/companies/:id",
    element:<CompanySetup/>
  },
  {
    path:"/admin/jobs",
    element:<AdminJobs/>
  },
  {
    path:"/admin/jobs/create",
    element :<PostJob/>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<Applicants/>
  }
])

function App() {
  const { user } = useSelector((store) => store.auth);
  const [showSweep, setShowSweep] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("logged-in", Boolean(user));
    document.body.classList.toggle("role-recruiter", user?.role === "Recruiter");

    if (user && sessionStorage.getItem("showLoginThemeSweep") === "true") {
      sessionStorage.removeItem("showLoginThemeSweep");
      setShowSweep(true);
      setShowSparkle(true);
      const sweepTimer = setTimeout(() => setShowSweep(false), 1000);
      const sparkleTimer = setTimeout(() => setShowSparkle(false), 1700);
      return () => {
        clearTimeout(sweepTimer);
        clearTimeout(sparkleTimer);
      };
    }
  }, [user]);

  const isRecruiter = user?.role === "Recruiter";

  return (
    <div className="relative min-h-screen">
      {/* One-time sparkle wave across base dots when logged in */}
      {showSparkle && (
        <>
          <div className={`fixed inset-0 z-0 pointer-events-none ${isRecruiter ? "sparkle-dots-recruiter-1" : "sparkle-dots-student-1"}`} />
          <div className={`fixed inset-0 z-0 pointer-events-none ${isRecruiter ? "sparkle-dots-recruiter-2" : "sparkle-dots-student-2"}`} />
          <div className={`fixed inset-0 z-0 pointer-events-none ${isRecruiter ? "sparkle-dots-recruiter-3" : "sparkle-dots-student-3"}`} />
        </>
      )}

      {/* Blurry transparent color sweep from sticker across screen */}
      {showSweep && (
        <div
          className={`fixed inset-0 z-50 pointer-events-none backdrop-blur-md animate-login-sweep bg-gradient-to-bl ${
            isRecruiter
              ? 'from-[#FA4F09]/35 via-[#ea580c]/25 to-[#fb923c]/15'
              : 'from-[#6B3AC2]/35 via-[#7c3aed]/25 to-[#9333ea]/15'
          }`}
        />
      )}

      <div className="relative z-10">
        <RouterProvider router={appRoute}></RouterProvider>
      </div>
    </div>
  )
}

export default App