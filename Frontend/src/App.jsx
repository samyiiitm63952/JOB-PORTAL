import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from "./components/authentication/Login"
import Register from "./components/authentication/Register"
import Home from './components/components_lite/Home'
import PrivacyPolicy from './components/components_lite/PrivacyPolicy.jsx'
import TermsofService from './components/components_lite/TermsofService.jsx'
import Jobs from './components/components_lite/Jobs'
import Browse from './components/components_lite/Browse'

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
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={appRoute}></RouterProvider>
    </div>
  )
}

export default App