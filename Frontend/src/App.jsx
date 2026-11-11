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

  useEffect(() => {
    if (user && sessionStorage.getItem("showLoginThemeSweep") === "true") {
      sessionStorage.removeItem("showLoginThemeSweep");
      setShowSweep(true);
      const timer = setTimeout(() => setShowSweep(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  return (
    <div>
      {showSweep && (
        <div
          className={`fixed inset-0 z-50 pointer-events-none animate-login-sweep bg-gradient-to-bl ${
            user?.role === 'Recruiter'
              ? 'from-[#FA4F09] via-[#ea580c] to-[#fb923c]'
              : 'from-[#6B3AC2] via-[#7c3aed] to-[#9333ea]'
          }`}
        />
      )}
      <RouterProvider router={appRoute}></RouterProvider>
    </div>
  )
}

export default App